import "./App.css";
import LoginPage from "./Views/LoginPage/LoginPage";
import RegistrationPage from "./Views/RegistrationPage/RegistrationPage";
import Counter from "./Components/Counter/Counter";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/counter" component={Counter} />
      </Switch>
    </div>
  );
}

export default App;
