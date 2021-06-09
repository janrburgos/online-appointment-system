import ApplicationItem from "../ApplicationItem/ApplicationItem";
import { useSelector } from "react-redux";

const ApplicationTab = () => {
  const applications = useSelector(
    (state) => state.applicationsReducer.applications
  );

  return (
    <div className="ApplicationTab">
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

export default ApplicationTab;
