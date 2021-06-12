import "./ApplicationDetailTab.css";
import SetAppointmentDate from "../SetAppointmentDate/SetAppointmentDate";
import { Route, Link, useLocation } from "react-router-dom";
import React, { useState, useRef } from "react";
import moment from "moment";
import axios from "axios";

const ApplicationDetailTab = () => {
  const location = useLocation();
  const [application, setApplication] = useState(location.state);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(
    Number(localStorage.getItem("selectedDocumentIndex"))
  );
  const fileHandler = useRef(null);

  const setAppointmentDateHandler = (pickedDate) => {
    axios
      .put(`http://localhost:1337/api/applications/${application._id}`, {
        transactionStatus: "to claim document",
        appointmentDate: moment(pickedDate).format("MMMM DD, YYYY"),
      })
      .then((res) => {
        setApplication(res.data);
      });
  };

  const sendApplicationClickHandler = () => {
    axios
      .put(`http://localhost:1337/api/applications/${application._id}`, {
        transactionStatus: "pending",
        transactionStatusUpdated: Date.now(),
      })
      .then((res) => {
        setApplication(res.data);
      });
  };
  return (
    <section className="ApplicationDetailTab">
      <div className="application-detail-top">
        <table>
          <tbody>
            <tr>
              <td>Transaction Document:</td>
              <td>{application.transactionDocument}</td>
            </tr>
            <tr>
              <td>Transaction Date:</td>
              <td>{moment(application.transactionDate).format("lll")}</td>
            </tr>
            <tr>
              <td>Transaction Status:</td>
              <td>
                <b>{application.transactionStatus}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="table-divider"></div>
        <table>
          <tbody>
            <tr>
              <td>Amount:</td>
              <td>{application.amount}.00</td>
            </tr>
            <tr>
              <td>Payment Status:</td>
              <td>
                <div>{application.paymentStatus}</div>
              </td>
            </tr>
            <tr>
              <td>Appointment Date:</td>
              <td>
                <b>{application.appointmentDate}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {application.transactionStatus === "set appointment date" && (
        <SetAppointmentDate
          setAppointmentDateHandler={setAppointmentDateHandler}
        />
      )}
      <div className="application-detail-bottom">
        <div className="requirement-list">
          <ul>
            {application.transactionRequirements.map((reqr, index) => (
              <li key={`requirement-list-li-${index}-${reqr.requirementName}`}>
                <Link
                  to={{
                    pathname: `/main/applications/${application._id}/${index}`,
                    state: { ...application },
                  }}
                  onClick={() => {
                    setSelectedDocumentIndex(index);
                    localStorage.setItem("selectedDocumentIndex", index);
                  }}
                >
                  <div
                    style={
                      index === selectedDocumentIndex
                        ? {
                            backgroundColor: "var(--secondary-color)",
                          }
                        : null
                    }
                  >
                    {reqr.requirementName}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="document-photo-container">
          {application.transactionRequirements.map((reqr, index) => (
            <Route
              key={`route-${reqr.requirementName}-${index}`}
              path={`/main/applications/${application._id}/${index}`}
            >
              <div>
                <input
                  type="file"
                  id="avatar"
                  ref={fileHandler}
                  accept="image/*"
                  onInput={() => {
                    let file = fileHandler.current.files[0];
                    let param = new FormData();
                    param.append(`${reqr.requirementName}`, file, file.name);
                    param.append("chunk", "0");
                    let config = {
                      headers: { "Content-Type": "multipart/form-data" },
                    };
                    axios
                      .post(
                        `http://localhost:1337/api/upload/${reqr.requirementName}`,
                        param,
                        config
                      )
                      .then((res) => {
                        let transactionsToEdit = [
                          ...application.transactionRequirements,
                        ];
                        transactionsToEdit[index] = {
                          requirementName: reqr.requirementName,
                          requirementUrl: res.data.filename,
                          requirementStatus: "pending",
                        };
                        axios
                          .put(
                            `http://localhost:1337/api/applications/${application._id}`,
                            { transactionRequirements: transactionsToEdit }
                          )
                          .then((res) => {
                            setApplication(res.data);
                          });
                      });
                  }}
                />
              </div>
              <img
                src={`http://localhost:1337/Uploads/${reqr.requirementUrl}`}
                alt="document"
              />
            </Route>
          ))}
        </div>
      </div>
      <div className="send-application">
        <button onClick={sendApplicationClickHandler}>Send Application</button>
        {application.transactionStatus !== "pending" ||
          (application.transactionStatus !== "-" && (
            <span>Application sent!</span>
          ))}
      </div>
      <div className="application-remarks">
        <p className="inner-header">remarks</p>
        <p className="remarks">{application.remarks}</p>
      </div>
    </section>
  );
};

export default ApplicationDetailTab;
