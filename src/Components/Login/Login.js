import React, { useContext } from "react";
import { AccountContext } from "../../Context/AccountProvider";
import { auth, provider } from "../firebase";
import "./login.css";

const Login = () => {
  const { account, setAccount } = useContext(AccountContext);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        setAccount(result.user);
      })
      .catch((error) => {
        console.log(error);
        window.alert("Sigin Failed");
      });
  };
  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://colorlap.com//wp-content/uploads/2013/04/Chatbox-Logo.jpg"
          alt=""
        />
        <div className="login-text">
          <h1>Signin To what's App</h1>
        </div>
        <button className="login-button" onClick={signIn}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
