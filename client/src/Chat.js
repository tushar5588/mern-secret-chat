import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./assets/css/Chat.css";

function Chat({ socket, username, room, number }) {
  const [message, setMessage] = useState("");
  
  const [messageList, setMessageList] = useState([]);
  
  const time =
    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
  new Date(Date.now()).getMinutes();
 
  const sendMessage = async (event) => {
    event.preventDefault();
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time: time,
        number: number,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="main">
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i>Secret_Chat
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </header>

        <main className="msger-chat">
          <div className="msg left-msg">
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Secret_Chat</div>
                <div className="msg-info-time">{time}</div>
              </div>

              <div className="msg-text">Welcome to the chat {username}</div>
            </div>
          </div>
          {messageList.map((recievedmsg) => {
            if (recievedmsg.number === number) {
              return (
                <div className="msg right-msg">
                  <div className="msg-bubble">
                    <div className="msg-info">
                      <div className="msg-info-name">{recievedmsg.author}</div>
                      <div className="msg-info-time">{recievedmsg.time}</div>
                    </div>

                    <div className="msg-text">{recievedmsg.message}</div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="msg left-msg">
                  <div className="msg-bubble">
                    <div className="msg-info">
                      <div className="msg-info-name">{recievedmsg.author}</div>
                      <div className="msg-info-time">{recievedmsg.time}</div>
                    </div>

                    <div className="msg-text">{recievedmsg.message}</div>
                  </div>
                </div>
              );
            }
          })}
        </main>

        <form className="msger-inputarea">
          <input
            type="text"
            className="msger-input"
            value={message}
            placeholder="Enter your message..."
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            type="submit"
            className="msger-send-btn"
            onClick={sendMessage}
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

export default Chat;
