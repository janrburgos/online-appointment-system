import "./ApplicationsTab.css";
import ApplicationItem from "../ApplicationItem/ApplicationItem";
import { useSelector } from "react-redux";

const ApplicationsTab = ({ role }) => {
  const applications = useSelector(
    (state) => state.applicationsReducer.applications
  );

  return (
    <section className="ApplicationsTab">
      {role === "applicant" ? (
        <p className="inner-header">application history</p>
      ) : (
        <p className="inner-header">pending applications</p>
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
