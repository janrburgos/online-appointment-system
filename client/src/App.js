import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import MainPage from "./Pages/MainPage/MainPage";
import ReviewerMainPage from "./Pages/ReviewerMainPage/ReviewerMainPage";

import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import ApplicationDetailTab from "./Components/ApplicationDetailTab/ApplicationDetailTab";

const App = () => {
  const dispatch = useDispatch();

  axios(`http://localhost:1337/api/doctypes`).then((res) =>
    dispatch({ type: "INSERT_DOCTYPES", payload: res.data })
  );

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
