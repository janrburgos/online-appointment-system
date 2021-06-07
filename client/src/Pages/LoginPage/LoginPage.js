import "./LoginPage.css";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    setLoginError("");
    axios(`http://localhost:1337/api/applicants/${email}`).then((res) => {
      if (res.data[0] === undefined) {
        return setLoginError("this email address is not registered");
      } else if (res.data[0].password !== password) {
        return setLoginError("this password is incorrect");
      } else {
        dispatch({ type: "INSERT_APPLICANT_INFO", payload: res.data[0] });
        history.push("/main");
      }
    });
  };

  return (
    <div className="LoginPage">
      <div className="login-error">{loginError}</div>
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
