import "./ApplicationsTab.css";
import ApplicationItem from "../ApplicationItem/ApplicationItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ApplicationsTab = ({ role }) => {
  const history = useHistory();
  const applications = useSelector(
    (state) => state.applicationsReducer.applications
  );

  const reviewerLoginClickHandler = () => {
    history.push("/reviewer");
  };

  return (
    <section className="ApplicationsTab">
      {role === "applicant" ? (
        <p className="inner-header">application history</p>
      ) : (
        <>
          <button
            className="reviewer-logout"
            onClick={reviewerLoginClickHandler}
          >
            Logout
          </button>
          <p className="inner-header">pending applications</p>
        </>
      )}
      <div className="application-history">
        {applications.map((application) => (
          <ApplicationItem
            key={`applicationitem-${application._id}`}
            application={application}
            role={role}
          />
        ))}
      </div>
    </section>
  );
};

export default ApplicationsTab;
