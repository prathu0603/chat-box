import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import db from "../firebase";
import {
  BiSearch,
  BiDotsVerticalRounded,
  BiMessageSquareError,
} from "react-icons/bi";
import { CgAttachment, CgSmileMouthOpen } from "react-icons/cg";
import { IoMdMic } from "react-icons/io";
import "./chat.css";
import { AccountContext } from "../../Context/AccountProvider";
import firebase from "firebase";

const Chat = () => {
  const { account } = useContext(AccountContext);
  const { roomId } = useParams();
  const [roomName, SetRoomName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => SetRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      name: account.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  // console.log(account.displayName);

  return (
    <div className="chat-wraper">
      <div className="chat-header">
        <img
          className="avatar"
          src="https://avatars.dicebear.com/api/gridy/z.svg"
          alt="DP"
        />
        <div className="chat-header-info">
          <h2 className="h2">{roomName}</h2>
          <p className="p">
            {messages.length > 0 ? (
              <>
                <span className="lastseen"> Last Seen</span>
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
              </>
            ) : (
              <span>
                No Messages <BiMessageSquareError />{" "}
              </span>
            )}
          </p>
        </div>
        <div className="chat-header-right">
          <BiSearch className="icons" />
          <CgAttachment className="icons" />
          <BiDotsVerticalRounded className="icons" />
        </div>
      </div>
      <div className="chat-body">
        {/* Using FireBase  */}
        {messages.map((message) => (
          <p
            className={`p chat-message ${
              message.name === account.displayName && "chat-receiver"
            }`}
          >
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="chat-timeStamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}

        {/* Hard Coded */}
        {/* <p className="p chat-message chat-receiver">
          <span className="chat-name">Sonny</span>
          This is a Message
          <span className="chat-timeStamp">{new Date().toUTCString()}</span>
        </p>
        <p className="p chat-message">
          <span className="chat-name">Sonny</span>
          This is a Message
          <span className="chat-timeStamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat-footer">
        <CgSmileMouthOpen className="icons" />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <IoMdMic className="icons" />
      </div>
    </div>
  );
};

export default Chat;
