import "./ApplicationsTab.css";
import ApplicationItem from "../ApplicationItem/ApplicationItem";
import { useSelector } from "react-redux";

const ApplicationsTab = () => {
  const applications = useSelector(
    (state) => state.applicationsReducer.applications
  );

  return (
    <section className="ApplicationsTab">
      <p className="inner-header">application history</p>
      <div className="application-history">
        {applications.map((application) => (
          <ApplicationItem
            key={`applicationitem-${application._id}`}
            application={application}
          />
        ))}
      </div>
    </section>
  );
};

export default ApplicationsTab;
