import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            placeholder="Name.."
            className="joinInput"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Room.."
            className="joinInput mt-20"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          //prevent user did not specify name or room, could lead to break app
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          onKeyPress={(e) => e.key === "Enter"}
          to={`/chat?name=${name}&room=${room}`} //set dynamic link (changeable)
        >
          <button
            className="button mt-20"
            type="submit"
            onKeyPress={(e) => e.key === "Enter"}
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
