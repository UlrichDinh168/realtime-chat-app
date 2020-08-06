import React, { useState, useEffect } from "react";
import queryString from "query-string"; //queryString return an object contain what parameters come after ? sign
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState(""); //each msg
  const [messages, setMessages] = useState([]); //array of msgs
  const ENDPOINT = "https://ulrich-chat-application.herokuapp.com/";

  // <---- handling join event ----> 
  useEffect(() => {
    //location belongs to React Router
    //we can destructure data that comes inside {name,room}
    const { name, room } = queryString.parse(location.search);
    // console.log(location.search) => ?name=Ulrich&room=room
    // console.log(name, room) => data in a object form {name:"Ulrich", room:"room"}
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    //emit can also be passed in an object ie. {name, room} <= this is object, not destructuring
    //
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      //cleanup function, equal to ComponentDidUnmount
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]); //only if these 2 values change, we need to re-render useEffect

  //<---- handling messages  ---->
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault(); 
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
