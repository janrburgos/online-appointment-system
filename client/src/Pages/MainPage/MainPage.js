import "./MainPage.css";
import Profile from "../../Components/Profile/Profile";
import Application from "../../Components/Application/Application";
import Transaction from "../../Components/Transaction/Transaction";

import { Route, Link, Switch, useHistory } from "react-router-dom";

const MainPage = () => {
  const history = useHistory();
  const appointmentButtonClickHandler = () => {
    history.push("/main/transaction");
  };

  return (
    <div className="MainPage">
      <header>
        <div className="nav-menu">menu</div>
      </header>
      <main>
        <div className="applicant-main">
          <div>
            <img src="" alt="" />
            <div>
              <div className="applicant-name">juan dela cruz</div>
              <div className="applicant-email">juandelacruz@gmail.com</div>
              <div className="applicant-number">12345</div>
            </div>
          </div>
          <div className="button-div">
            <button
              className="appointment-button"
              onClick={appointmentButtonClickHandler}
            >
              select appointment
            </button>
          </div>
        </div>
        <nav className="applicant-nav">
          <ul>
            <Link to="/main">
              <li>profile</li>
            </Link>
            <Link to="/main/application">
              <li>application</li>
            </Link>
          </ul>
        </nav>
        <div className="applicant-details">
          <Switch>
            <Route path="/main/application" component={Application} />
            <Route path="/main" component={Profile} />
          </Switch>
        </div>
      </main>
      <Route path="/main/transaction" component={Transaction} />
    </div>
  );
};

export default MainPage;
