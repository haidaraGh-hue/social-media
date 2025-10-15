import "./ChatWindow.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Cookies from "universal-cookie";
import Pusher from "pusher-js";
import { User } from "../../context/UserContext";

window.Pusher = Pusher;

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [toUser, setToUser] = useState([]);


  // Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const id = window.location.pathname.split("/").slice(-1)[0];

  const user = useContext(User);

  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: "", // your key
      cluster: '', //your cluster
      forceTLS: true,
    });

    const channel = echo.channel("chat");

    channel.listen("MessageSent", (e) => {
      setMessages((prevMessages) => [...prevMessages, e.message]);
    });

    return () => {
      channel.stopListening("MessageSent");
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/getMessages/${user.auth.userDetails.id}/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [runUseEffect]);

  const sendMessage = () => {
    axios.post("http://127.0.0.1:8000/api/sendMessage", { message: newMessage , user_id: user.auth.userDetails.id , to_user_id: id}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + getToken,
      },
    })
    .then(() => {
      setNewMessage("");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
  };

  useEffect(() => {
    const getToUser = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/getUserById/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        );
        setToUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getToUser();
  }, [runUseEffect]);

  return (
    <div className="chat-window">
      <div className="navBar-chat">
        <div className="user-info-chat">
          <img src={toUser.profilePic === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? toUser.profilePic : `http://127.0.0.1:8000/storage/${toUser.profilePic}`} alt="" className="user-img-chat" />
          <span className="user-name-chat">{toUser.name}</span>
        </div>
        <div className="icons-nav-chat">
          <i className="fas fa-home icon-nav-chat"></i>
          <i className="fa-regular fa-bookmark fa-fw reaction icon-nav-chat"></i>
        </div>
      </div>
      <div className="window">
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
        {messages.length === 0 && <div>No messages yet</div>}
      </div>
      <div className="send-message-div">
          <input type="text" placeholder='Type a message...' className="send-message-input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <button className="submit-send-message" onClick={sendMessage}><i className="fa-regular fa-paper-plane fa-fw reaction"></i></button>
        </div>
    </div>
  );
}
