import "./SetAppointment.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const SetAppointment = () => {
  const dispatch = useDispatch();
  const [applicantInfo, setApplicantInfo] = useState(
    useSelector((state) => state.applicantInfoReducer.applicantInfo)
  );
  const applications = useSelector(
    (state) => state.applicationsReducer.applications
  );
  const doctypes = useSelector((state) => state.doctypesReducer.doctypes);
  const history = useHistory();
  const applyDocuments = doctypes.slice(0, 3);
  const [selectedDocument, setSelectedDocument] = useState({
    requirements: [],
  });
  const [selectedDocumentName, setSelectedDocumentName] = useState("");

  if (applicantInfo._id === undefined) {
    setApplicantInfo(JSON.parse(localStorage.getItem("applicantInfo")));
  }

  const closeButtonClickHandler = () => {
    localStorage.setItem("highlightedNav", "applications");
    dispatch({ type: "EDIT_HIGHLIGHTED_NAV", payload: "applications" });
    history.push("/main/applications");
  };

  const proceedButtonClickHandler = () => {
    let transactionRequirements = [
      ...selectedDocument.requirements.map((reqr) => {
        return { requirementName: reqr };
      }),
    ];
    axios
      .post("http://localhost:1337/api/applications", {
        applicantId: applicantInfo._id,
        transactionDocument: selectedDocument.name,
        amount: selectedDocument.amount,
        transactionRequirements,
      })
      .then((res) => {
        let newApplications = [...applications, res.data];
        dispatch({ type: "INSERT_APPLICATIONS", payload: newApplications });
      });
    localStorage.setItem("highlightedNav", "applications");
    dispatch({ type: "EDIT_HIGHLIGHTED_NAV", payload: "applications" });
    history.push("/main/applications");
  };

  return (
    <div className="SetAppointment">
      <div className="set-appointment-modal">
        <div className="select-title">
          <label htmlFor="select-document">
            <b>select document:</b>
          </label>
          <select
            name="select-document"
            id="select-document"
            onChange={(e) => {
              setSelectedDocumentName(e.target.value);
              setSelectedDocument(
                applyDocuments.find((doc) => doc.name === e.target.value)
              );
            }}
            value={selectedDocumentName}
          >
            <option hidden>---select document---</option>
            {applyDocuments.map((doc) => (
              <option key={`selecteddocoption-${doc.name}`}>{doc.name}</option>
            ))}
          </select>
        </div>
        <div className="requirement-box">
          <div className="requirement-title">
            <b>requirements:</b>
          </div>
          <div className="requirement-list">
            <ul>
              {selectedDocument.requirements.map((doc, index) => (
                <li key={`selecteddocreq-${doc._id}-${index}`}>{doc}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="set-appointment-buttons">
          <button onClick={proceedButtonClickHandler}>proceed</button>
          <button onClick={closeButtonClickHandler}>close</button>
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
