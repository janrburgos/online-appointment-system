import "./Transaction.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Transaction = () => {
  const [applyDocuments, setApplyDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState();
  const history = useHistory();

  useEffect(() => {
    axios("http://localhost:1337/api/doctypes").then((res) => {
      let allDoctypes = res.data.splice(0, 3);
      setApplyDocuments(allDoctypes);
    });
  }, []);

  const documentSelectChangeHandler = (e) => {
    setSelectedDocument(
      applyDocuments.find((document) => document.name === e.target.value)
    );
  };

  const closeButtonClickHandler = () => {
    history.push("/main");
  };

  const proceedButtonClickHandler = () => {
    axios.post("http://localhost:1337/api/applications", {
      transactionDocument: selectedDocument.name,
      amount: selectedDocument.amount,
      transactionRequirements: selectedDocument.requirements,
    });
    history.push("/main/application");
  };

  return (
    <div className="Transaction">
      <div className="transaction-modal">
        <div className="select-title">
          <label htmlFor="select-document">select document</label>
          <select
            name="select-document"
            id="select-document"
            onChange={(e) => documentSelectChangeHandler(e)}
          >
            <option hidden selected value="">
              ---select a document---
            </option>
            {applyDocuments.map((doc) => (
              <option value={doc.name}>{doc.name}</option>
            ))}
          </select>
        </div>
        <div className="requirement-box">
          <div className="requirement-title">requirements</div>
          <div className="requirement-list">
            <ul>
              {selectedDocument
                ? selectedDocument.requirements.map((doc) => <li>{doc}</li>)
                : null}
            </ul>
          </div>
        </div>
        <div className="transaction-buttons">
          <button onClick={proceedButtonClickHandler}>proceed</button>
          <button onClick={closeButtonClickHandler}>close</button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
