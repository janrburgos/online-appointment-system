import "./MainPage.css";
import ProfileTab from "../../Components/ProfileTab/ProfileTab";
import DocumentsTab from "../../Components/DocumentsTab/DocumentsTab";
import ApplicationsTab from "../../Components/ApplicationsTab/ApplicationsTab";
import ApplicationDetailTab from "../../Components/ApplicationDetailTab/ApplicationDetailTab";
import SetAppointment from "../../Components/SetAppointment/SetAppointment";

import { Route, Link, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef } from "react";
import axios from "axios";

const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const avatarHandler = useRef(null);
  const [highlightedNav, setHighlightedNav] = useState(
    localStorage.getItem("highlightedNav")
  );
  const [applicantInfo, setApplicantInfo] = useState(
    useSelector((state) => state.applicantInfoReducer.applicantInfo)
  );

  if (localStorage.getItem("applicantInfo") === null) {
    history.push("/");
  } else if (applicantInfo._id === undefined) {
    setApplicantInfo(JSON.parse(localStorage.getItem("applicantInfo")));
  }

  axios(`http://localhost:1337/api/applications/${applicantInfo._id}`).then(
    (res) => dispatch({ type: "INSERT_APPLICATIONS", payload: res.data })
  );

  const setAppointmentButtonClickHandler = () => {
    history.push("/main/set-appointment");
  };

  const changeAvatarInputHandler = () => {
    let file = avatarHandler.current.files[0];
    let param = new FormData();
    param.append(`avatar`, file, file.name);
    param.append("chunk", "0");
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios
      .post(`http://localhost:1337/api/upload/avatar`, param, config)
      .then((res) => {
        axios
          .put(`http://localhost:1337/api/applicants/${applicantInfo._id}`, {
            avatar: res.data.filename,
          })
          .then((res) => {
            setApplicantInfo(res.data);
            localStorage.setItem("applicantInfo", JSON.stringify(res.data));
          });
      });
  };

  return (
    <div className="MainPage">
      <header>
        <button onClick={() => history.push("/")}>logout</button>
      </header>
      <main>
        <div className="applicant-main">
          <div className="applicant-main-top">
            <div className="avatar-container">
              <img
                src={`http://localhost:1337/Avatars/${applicantInfo.avatar}`}
                alt="avatar"
              />
            </div>
            <div className="primary-info">
              <div className="applicant-name">
                {`${applicantInfo.firstName} ${applicantInfo.middleName} ${applicantInfo.lastName}`}
              </div>
              <div className="applicant-email">{applicantInfo.email}</div>
              <div className="applicant-number">
                {applicantInfo.applicantNumber}
              </div>
            </div>
          </div>
          <div className="applicant-main-bottom">
            <button
              className="appointment-button"
              onClick={setAppointmentButtonClickHandler}
            >
              set appointment
            </button>
            <label className="change-avatar-label">
              <input
                type="file"
                className="change-avatar-button"
                ref={avatarHandler}
                onInput={changeAvatarInputHandler}
              />
              change avatar
            </label>
          </div>
        </div>
        <nav className="applicant-nav">
          <ul>
            <Link
              to="/main"
              onClick={() => {
                setHighlightedNav("profile");
                localStorage.setItem("highlightedNav", "profile");
              }}
            >
              <li>
                <div
                  style={
                    highlightedNav === "profile"
                      ? {
                          backgroundColor: "var(--font-color)",
                          color: "var(--secondary-color)",
                        }
                      : null
                  }
                >
                  profile
                </div>
              </li>
            </Link>
            <Link
              to="/main/documents"
              onClick={() => {
                setHighlightedNav("documents");
                localStorage.setItem("highlightedNav", "documents");
              }}
            >
              <li>
                <div
                  style={
                    highlightedNav === "documents"
                      ? {
                          backgroundColor: "var(--font-color)",
                          color: "var(--secondary-color)",
                        }
                      : null
                  }
                >
                  documents
                </div>
              </li>
            </Link>
            <Link
              to="/main/applications"
              onClick={() => {
                setHighlightedNav("applications");
                localStorage.setItem("highlightedNav", "applications");
              }}
            >
              <li>
                <div
                  style={
                    highlightedNav === "applications"
                      ? {
                          backgroundColor: "var(--font-color)",
                          color: "var(--secondary-color)",
                        }
                      : null
                  }
                >
                  applications
                </div>
              </li>
            </Link>
          </ul>
        </nav>
        <div className="applicant-details">
          <Switch>
            <Route
              path="/main/applications/:_id"
              component={ApplicationDetailTab}
            />
            <Route path="/main/applications" component={ApplicationsTab} />
            <Route path="/main/documents" component={DocumentsTab} />
            <Route path="/main" component={ProfileTab} />
          </Switch>
        </div>
      </main>
      <Route path="/main/set-appointment" component={SetAppointment} />
    </div>
  );
};

export default MainPage;
