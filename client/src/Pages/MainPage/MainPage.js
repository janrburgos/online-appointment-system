import "./MainPage.css";
import ProfileTab from "../../Components/ProfileTab/ProfileTab";
import DocumentsTab from "../../Components/DocumentsTab/DocumentsTab";
import ApplicationsTab from "../../Components/ApplicationsTab/ApplicationsTab";
import ApplicationDetailTab from "../../Components/ApplicationDetailTab/ApplicationDetailTab";
import SetAppointment from "../../Components/SetAppointment/SetAppointment";

import { Route, Link, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const applicantInfo = useSelector(
    (state) => state.applicantInfoReducer.applicantInfo
  );

  axios(`http://localhost:1337/api/doctypes`).then((res) =>
    dispatch({ type: "INSERT_DOCTYPES", payload: res.data })
  );

  axios(`http://localhost:1337/api/applications/${applicantInfo._id}`).then(
    (res) => dispatch({ type: "INSERT_APPLICATIONS", payload: res.data })
  );

  const setAppointmentButtonClickHandler = () => {
    history.push("/main/set-appointment");
  };

  return (
    <div className="MainPage">
      <header>
        <div className="nav-menu">menu</div>
      </header>
      <main>
        <div className="applicant-main">
          <div>
            <img
              src={`http://localhost:1337/Uploads/${applicantInfo.avatar}`}
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
