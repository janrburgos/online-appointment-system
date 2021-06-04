import "./App.css";
import LoginPage from "./Views/LoginPage/LoginPage";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginPage} />
    </div>
  );
}

export default App;
