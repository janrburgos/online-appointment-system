import ApplicationItem from "../ApplicationItem/ApplicationItem";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicationTab = () => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    axios("http://localhost:1337/api/applications")
      .then((res) => setApplications([...res.data]))
      .then(console.log(applications));
  }, []);

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
