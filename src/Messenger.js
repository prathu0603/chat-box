import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import "./App.css";

import { AccountContext } from "./Context/AccountProvider";

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <div className="app">
      {!account ? (
        <Login />
      ) : (
        <div className="main-wraper">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default Messenger;
