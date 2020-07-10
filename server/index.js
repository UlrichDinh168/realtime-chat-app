const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connecttion", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use(router);
server.listen(PORT, () => console.log(`Server has start on port ${PORT}`));
