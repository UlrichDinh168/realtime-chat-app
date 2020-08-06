const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);
// <== admin: message ==> 
// <== user:sendMessage ==>

// on is a method with built-in keyword "connection"
// run when there is a client connection
io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    // callback 49:00
    //callback immediately trigger after
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room); //join the user to the room

    //tell the user the welcome to the chat
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    }); //link with the 2nd useEffect on ./server/index.js

    //tell everyone else besides that specific user that someone has joined the chat
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback(); //error handling or any callback needed
  });

  socket.on("sendMessage", (message, callback) => {
    
    //get user that send msg
    const user = getUser(socket.id);

    //specify the room name
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback(); //do sth after the msg was sent
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
