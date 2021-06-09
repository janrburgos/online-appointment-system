import ApplicationItem from "../ApplicationItem/ApplicationItem";
import { useSelector } from "react-redux";

const ApplicationsTab = () => {
  const applications = useSelector(
    (state) => state.applicationsReducer.applications
  );

  return (
    <div className="ApplicationsTab">
      <p>application history</p>
      <div className="application-history">
        {applications.map((application) => (
          <ApplicationItem
            key={`applicationitem-${application._id}`}
            application={application}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsTab;
