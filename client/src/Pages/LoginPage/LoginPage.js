import "./LoginPage.css";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push("/main");
  };

  return (
    <div className="LoginPage">
      <div className="login-box">
        <strong>sign in to your account</strong>
        <input
          type="email"
          name="email-login"
          id="email-login"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
      <Link to="/register">
        <p>register</p>
      </Link>
    </div>
  );
};

export default LoginPage;
