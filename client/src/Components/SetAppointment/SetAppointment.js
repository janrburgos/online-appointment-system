import "./SetAppointment.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SetAppointment = () => {
  const applicantInfo = useSelector(
    (state) => state.applicantInfoReducer.applicantInfo
  );
  const doctypes = useSelector((state) => state.doctypesReducer.doctypes);
  const history = useHistory();

  const applyDocuments = doctypes.slice(0, 3);
  const [selectedDocument, setSelectedDocument] = useState({
    requirements: [],
  });
  const [selectedDocumentName, setSelectedDocumentName] = useState("");

  const closeButtonClickHandler = () => {
    history.push("/main");
  };

  const proceedButtonClickHandler = () => {
    let transactionRequirements = [
      ...selectedDocument.requirements.map((reqr) => {
        return { requirementName: reqr };
      }),
    ];
    console.log(transactionRequirements);
    axios.post("http://localhost:1337/api/applications", {
      applicantId: applicantInfo._id,
      transactionDocument: selectedDocument.name,
      amount: selectedDocument.amount,
      transactionRequirements,
    });
    history.push("/main/application");
  };

  return (
    <div className="SetAppointment">
      <div className="set-appointment-modal">
        <div className="select-title">
          <label htmlFor="select-document">select document</label>
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
          <div className="requirement-title">requirements</div>
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
