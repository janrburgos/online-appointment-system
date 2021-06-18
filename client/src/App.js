import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import MainPage from "./Pages/MainPage/MainPage";
import ReviewerMainPage from "./Pages/ReviewerMainPage/ReviewerMainPage";

import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ApplicationDetailTab from "./Components/ApplicationDetailTab/ApplicationDetailTab";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (localStorage.getItem("doctypes") !== "") {
    dispatch({
      type: "INSERT_DOCTYPES",
      payload: JSON.parse(localStorage.getItem("doctypes")),
    });
  }

  if (localStorage.getItem("highlightedNav") !== "") {
    dispatch({
      type: "EDIT_HIGHLIGHTED_NAV",
      payload: localStorage.getItem("highlightedNav"),
    });
  }

  if (localStorage.getItem("applications") !== "") {
    dispatch({
      type: "INSERT_APPLICATIONS",
      payload: JSON.parse(localStorage.getItem("applications")),
    });
  }

  if (localStorage.getItem("documents") !== "") {
    dispatch({
      type: "INSERT_DOCUMENTS",
      payload: JSON.parse(localStorage.getItem("documents")),
    });
  }

  if (localStorage.getItem("applicantInfo") !== "") {
    dispatch({
      type: "INSERT_APPLICANT_INFO",
      payload: JSON.parse(localStorage.getItem("applicantInfo")),
    });
  } else {
    history.push("/");
  }

  if (localStorage.getItem("pendingApplications") !== "") {
    dispatch({
      type: "INSERT_PENDING_APPLICATIONS",
      payload: JSON.parse(localStorage.getItem("pendingApplications")),
    });
  }

  return (
    <div className="App">
      <Switch>
        {/* Applicant */}
        <Route
          exact
          path="/"
          render={(props) => <LoginPage {...props} role={"applicant"} />}
        />
        <Route path="/main" component={MainPage} />
        <Route path="/register" component={RegistrationPage} />
        {/* Reviewer */}
        <Route
          exact
          path="/reviewer"
          render={(props) => <LoginPage {...props} role={"reviewer"} />}
        />
        <Route path="/reviewer/main" component={ReviewerMainPage} />
        <Route path="/reviewer/applications" component={ApplicationDetailTab} />
      </Switch>
    </div>
  );
};

export default App;
