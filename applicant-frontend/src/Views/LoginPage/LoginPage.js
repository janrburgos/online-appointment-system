import "./LoginPage.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push("/home");
  };

  return (
    <div className="LoginPage">
      <div className="login-box">
        <strong>sign in to your account</strong>
        <input
          type="text"
          name="username-login"
          id="username-login"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          name="password-login"
          id="password-login"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="login-button" onClick={handleClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
