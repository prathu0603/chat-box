import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import db from "../firebase";

import "./sidebar.css";
import { BiCommentAdd } from "react-icons/bi";

export const Chatinfo = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter Name For Chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  console.log(messages);
  return !addNewChat ? (
    <NavLink to={`/rooms/${id}`}>
      <div className="sidebar-chat">
        <img
          className="avatar"
          src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}
          alt="frnds dp"
        />
        <div className="sidebar-chat-info">
          <h2 className="chatinfo-header">{name}</h2>
          <p className="chatinfo-p">
            {messages.length === 0 ? (
              <span>No Chats yet ...</span>
            ) : (
              <>{messages[0]?.message}</>
            )}
          </p>
        </div>
      </div>
    </NavLink>
  ) : (
    <div onClick={createChat} className="new-chat">
      <BiCommentAdd className="create-logo" />
      <h2> Add New Chat </h2>
    </div>
  );
};
