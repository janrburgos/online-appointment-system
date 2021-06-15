import "./DocumentTab.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const DocumentsTab = () => {
  const [documents, setDocuments] = useState([]);
  const [applicantInfo, setApplicantInfo] = useState(
    useSelector((state) => state.applicantInfoReducer.applicantInfo)
  );

  if (applicantInfo._id === undefined) {
    setApplicantInfo(JSON.parse(localStorage.getItem("applicantInfo")));
  }

  useEffect(() => {
    axios(`http://localhost:1337/api/documents/${applicantInfo._id}`).then(
      (res) => setDocuments(res.data)
    );
  }, [applicantInfo]);

  return (
    <section className="DocumentsTab">
      <p className="inner-header">documents tab</p>
      {documents.length === 0 && (
        <div className="empty-tab">no documents uploaded...</div>
      )}
      <div className="documents-grid">
        {documents.map((document) => (
          <div
            key={`documents-grid-${document.documentUrl}`}
            className="document-box"
          >
            <p>{document.docType}</p>
            <img
              src={`http://localhost:1337/Uploads/${document.documentUrl}`}
              alt="document"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DocumentsTab;
