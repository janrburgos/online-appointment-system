import ApplicationItem from "../ApplicationItem/ApplicationItem";

const Application = () => {
  return (
    <div className="Application">
      <p>application history</p>
      <div className="application-history">
        <ApplicationItem />
        <ApplicationItem />
      </div>
    </div>
  );
};

export default Application;
