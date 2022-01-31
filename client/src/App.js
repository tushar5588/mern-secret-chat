import "./assets/css/App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [number, setNumber] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (event) => {
    event.preventDefault()
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
    {!showChat ? (
      <div className="login-body">
      <section>
      <div className="top-img"></div>
      <form className="col-lg-5 col-md-7 col-sm-8 col-10 shadow bg-white p-5 text-center">
          <h1 className="mb-5">Secret-Chat</h1>
          <input type="email" value={username} onChange={(event)=>setUsername(event.target.value)} className="form-control my-4 rounded-0 p-0" placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Email'" />
          <input type="email" value={room} onChange={(event)=>setRoom(event.target.value)} className="form-control my-4 rounded-0 p-0" placeholder="Room Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Email'" />
          <input type="email" value={number} onChange={(event)=>setNumber(event.target.value)} className="form-control my-4 rounded-0 p-0" placeholder="Phone Number" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Email'" />
         
          <button onClick={joinRoom} className="btn text-white text-uppercase rounded-0 mt-5 mb-4 btn-block">Join Room</button>
      </form>
  </section>
  </div>

            ) : (
          <Chat socket={socket} username={username} room={room} number={number}/>
            )}
            </>
     )
     }
     
   
   export default App;
   