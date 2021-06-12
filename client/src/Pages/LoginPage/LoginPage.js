import "./LoginPage.css";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ role }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const loginValidation = (role, success) => {
    setLoginError("");
    if (email.trim() === "") {
      emailRef.current.focus();
      return setLoginError("Enter an email address");
    }
    if (password.trim() === "") {
      passwordRef.current.focus();
      return setLoginError("Enter a password");
    }
    axios(`http://localhost:1337/api/${role}s/${email}`).then((res) => {
      if (res.data[0] === undefined) {
        emailRef.current.focus();
        return setLoginError("This email address is not registered");
      } else if (res.data[0].password !== password) {
        passwordRef.current.focus();
        return setLoginError("This password is incorrect");
      } else {
        success(res.data[0]);
      }
    });
  };

  const applicantLoginSuccess = (result) => {
    dispatch({ type: "INSERT_APPLICANT_INFO", payload: result });
    localStorage.setItem("applicantInfo", JSON.stringify(result));
    localStorage.setItem("highlightedNav", "profile");
    history.push("/main");
  };

  const loginHandler = () => {
    if (role === "applicant") {
      loginValidation(role, applicantLoginSuccess);
    } else {
      history.push("/reviewer/main");
    }
  };

  return (
    <div className="LoginPage">
      <div className="login-box">
        <p className="title">Sign in to your account</p>
        <span className="login-error">{loginError}</span>
        <input
          type="email"
          name="email-login"
          id="email-login"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          ref={emailRef}
          onKeyDown={(e) =>
            e.key === "Enter" ? passwordRef.current.focus() : null
          }
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
          ref={passwordRef}
          onKeyDown={(e) => (e.key === "Enter" ? loginHandler() : null)}
        />
        <button className="login-button" onClick={loginHandler}>
          Log In
        </button>
        <small
          onClick={() => {
            passwordRef.current.type === "password"
              ? (passwordRef.current.type = "text")
              : (passwordRef.current.type = "password");
          }}
        >
          Show/Hide password
        </small>
      </div>
      <p className="register-message">
        Don't have an account?
        <Link to="/register">
          <span> Register here</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
