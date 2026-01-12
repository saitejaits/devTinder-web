import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/createSocketConnection";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  // console.log("targetUserId",targetUserId);
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [newMessage, setNewMessage] = useState("");


  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {withCredentials: true});
    console.log("fetchChatMessages:-",chat?.data?.messages);

    const chatMessages = chat?.data?.messages.map( (msg) => {
      const {senderId,text} = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text: text,
      }
    })
    // console.log(chatMessages)
    setMessages(chatMessages)
  }

  useEffect( () => {
    fetchChatMessages()
  },[targetUserId])

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // as soon as the page loaded , the socket connetion is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({firstName,lastName , TextMessage}) => {
        console.log(firstName + " : " + TextMessage);
        setMessages((messages) =>[...messages , {firstName, lastName,text: TextMessage}])
    })
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const newMessageVariable = (e) => {
    setNewMessage(e.target.value);
  };

  

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      TextMessage: newMessage,
    });
    setNewMessage("")
  };
  return (
    <div className="chat-container">
      <h1 className="chat-header-title">Chat</h1>
      <div className="chat-messages">
        {messages.map((eachMessage, index) => {
          const isOwnMessage = user.firstName === eachMessage.firstName;

          return (
            <div key={index} className={`chat ${isOwnMessage ? "right" : "left"}`}>
              <div className="chat-header">
                {`${eachMessage?.firstName}  ${eachMessage?.lastName}`}
                <time className="chat-time">2 hours ago</time>
              </div>
              <div className="chat-bubble">{eachMessage?.text}</div>
              <div className="chat-footer">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="chat-input-wrapper">
        <input
          value={newMessage}
          onChange={newMessageVariable}
          className="chat-input"
        ></input>
        <button onClick={sendMessage} className="chat-send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
