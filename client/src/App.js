import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import MainPage from "./Pages/MainPage/MainPage";

import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();

  axios(`http://localhost:1337/api/doctypes`).then((res) =>
    dispatch({ type: "INSERT_DOCTYPES", payload: res.data })
  );

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/main" component={MainPage} />
      </Switch>
    </div>
  );
};

export default App;
