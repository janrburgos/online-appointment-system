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
  const [applicantInfo, setApplicantInfo] = useState(
    useSelector((state) => state.applicantInfoReducer.applicantInfo)
  );
  const avatarHandler = useRef(null);

  axios(`http://localhost:1337/api/doctypes`).then((res) =>
    dispatch({ type: "INSERT_DOCTYPES", payload: res.data })
  );

  axios(`http://localhost:1337/api/applications/${applicantInfo._id}`).then(
    (res) => dispatch({ type: "INSERT_APPLICATIONS", payload: res.data })
  );

  const setAppointmentButtonClickHandler = () => {
    history.push("/main/set-appointment");
  };

  const changeAvatarInputHandler = (e) => {
    // axios.put(`http://localhost:1337/api/applicants/${applicantInfo._id}`,{avatar: })
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
          .then((res) => setApplicantInfo(res.data));
      });
  };

  // dispatch({ type: "INSERT_APPLICANT_INFO", payload: res.data })

  return (
    <div className="MainPage">
      <header>
        <button onClick={() => history.push("/")}>logout</button>
      </header>
      <main>
        <div className="applicant-main">
          <div>
            <img
              src={`http://localhost:1337/Avatars/${applicantInfo.avatar}`}
              alt="avatar"
            />
            <div>
              <div className="applicant-name">
                {`${applicantInfo.firstName} ${applicantInfo.middleName} ${applicantInfo.lastName}`}
              </div>
              <div className="applicant-email">{applicantInfo.email}</div>
              <div className="applicant-number">12345</div>
            </div>
          </div>
          <div className="button-div">
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
            <Link to="/main">
              <li>profile</li>
            </Link>
            <Link to="/main/documents">
              <li>documents</li>
            </Link>
            <Link to="/main/applications">
              <li>applications</li>
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
