import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import MainPage from "./Pages/MainPage/MainPage";
import Counter from "./Components/Counter/Counter";

import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/counter" component={Counter} />
      </Switch>
    </div>
  );
};

export default App;
