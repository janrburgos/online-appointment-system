import ApplicationItem from "../ApplicationItem/ApplicationItem";

const ApplicationTab = () => {
  return (
    <div className="ApplicationTab">
      <p>application history</p>
      <div className="application-history">
        <ApplicationItem />
        <ApplicationItem />
      </div>
    </div>
  );
};

export default ApplicationTab;
