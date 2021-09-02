import React, { useEffect, useState, useContext } from "react";
import "./sidebar.css";
import { MdDonutLarge, MdChat } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { TiGroupOutline } from "react-icons/ti";
import { Chatinfo } from "./Chatinfo";
import db from "../firebase";
import { AccountContext } from "../../Context/AccountProvider";

const Sidebar = () => {
  const { account } = useContext(AccountContext);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  console.log(account.photoURL);
  return (
    <div className="sidebar-wraper">
      <div className="sidebar-header">
        <img className="avatar" src={account.photoURL} alt="DP" />

        <div className="sidebar-header-right">
          <MdDonutLarge className="icons" />
          <MdChat className="icons" />
          <HiDotsVertical className="icons" />
        </div>
      </div>
      <div className="searchbar-wraper">
        <div className="searchbar-container">
          <TiGroupOutline className="search-icon" />
          <span>Chat Rooms</span>
        </div>
      </div>
      <div className="chat-wraper">
        <Chatinfo addNewChat />
        {rooms.map((room) => (
          <Chatinfo key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
