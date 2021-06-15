import "./ApplicationDetailTab.css";
import SetAppointmentDate from "../SetAppointmentDate/SetAppointmentDate";
import { Route, Link, useLocation, useHistory } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

const ApplicationDetailTab = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [application, setApplication] = useState({
    ...location.state.application,
  });
  const [applicantInfo, setApplicantInfo] = useState({});
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(
    Number(localStorage.getItem("selectedDocumentIndex"))
  );
  const [reviewerPaymentStatus, setReviewerPaymentStatus] =
    useState("accepted");
  const [reviewerTransactionStatus, setReviewerTransactionStatus] = useState(
    "set appointment date"
  );
  const [reviewerRemarks, setReviewerRemarks] = useState("-");
  const fileHandler = useRef(null);

  if (application === undefined) {
    setApplication(JSON.parse(localStorage.getItem("application")));
  }

  const updateApplicationsClickHandler = () => {
    axios(`http://localhost:1337/api/applications/${applicantInfo._id}`).then(
      (res) => dispatch({ type: "INSERT_APPLICATIONS", payload: res.data })
    );
  };

  const setAppointmentDateHandler = (pickedDate) => {
    axios
      .put(`http://localhost:1337/api/applications/${application._id}`, {
        transactionStatus: "to claim document",
        appointmentDate: pickedDate,
      })
      .then((res) => {
        setApplication(res.data);
        localStorage.setItem("application", JSON.stringify(res.data));
        updateApplicationsClickHandler();
        alert("Apointment date has been set");
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
        updateApplicationsClickHandler();
        alert("Application has been sent for review");
      });
  };

  const reviewerButtonClickHandler = () => {
    axios
      .put(`http://localhost:1337/api/applications/${application._id}`, {
        transactionStatus: reviewerTransactionStatus,
        paymentStatus: reviewerPaymentStatus,
        remarks: reviewerRemarks,
      })
      .then((res) => {
        setApplication(res.data);
        alert("Application reviewed");
      });
  };

  const backToPendingClickHandler = () => {
    history.push("/reviewer/main");
  };

  useEffect(() => {
    axios(
      `http://localhost:1337/api/applicants/id/${application.applicantId}`
    ).then((res) => {
      setApplicantInfo({ ...res.data[0] });
    });
  }, [application]);

  return (
    <section
      className={`ApplicationDetailTab ${
        location.state.role === "reviewer" ? "ReviewerDetailTab" : null
      }`}
    >
      {location.state.role === "reviewer" && (
        <>
          <div className="reviewer-back-button">
            <button onClick={backToPendingClickHandler}>
              Back to pending applications
            </button>
          </div>
          <div className="applicant-main-top">
            <div className="avatar-container">
              <img
                src={`http://localhost:1337/Avatars/${applicantInfo.avatar}`}
                alt={"avatar"}
              />
            </div>
            <div className="primary-info">
              <div className="applicant-name">
                {`${applicantInfo.firstName} ${applicantInfo.middleName} ${applicantInfo.lastName}`}{" "}
              </div>
              <div className="applicant-email">{applicantInfo.email}</div>
              <div className="applicant-number">
                {applicantInfo.applicantNumber}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="application-detail-top">
        <table>
          <tbody>
            <tr>
              <td>Transaction Document:</td>
              <td>{application.transactionDocument}</td>
            </tr>
            <tr>
              <td>Transaction Date:</td>
              <td>
                {moment(application.transactionDate).format(
                  "MMMM Do YYYY, h:mm:ss A"
                )}
              </td>
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
                <b>
                  {application.appointmentDate === "-"
                    ? "-"
                    : moment(application.appointmentDate).format(
                        "MMMM Do YYYY"
                      )}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {location.state.role === "applicant" &&
        application.transactionStatus === "set appointment date" && (
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
                  to={
                    location.state.role === "applicant"
                      ? {
                          pathname: `/main/applications/${application._id}/${index}`,
                          state: {
                            application,
                            role: location.state.role,
                          },
                        }
                      : {
                          pathname: `/reviewer/applications/${application._id}/${index}`,
                          state: {
                            application,
                            role: location.state.role,
                          },
                        }
                  }
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
            {location.state.role === "reviewer" && (
              <li>
                <Link
                  to={{
                    pathname: `/reviewer/applications/${application._id}/receipt`,
                    state: {
                      application,
                      role: location.state.role,
                    },
                  }}
                  onClick={() => {
                    setSelectedDocumentIndex(100);
                    localStorage.setItem("selectedDocumentIndex", 100);
                  }}
                >
                  <div
                    style={
                      selectedDocumentIndex === 100
                        ? {
                            backgroundColor: "var(--secondary-color)",
                          }
                        : null
                    }
                  >
                    receipt
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="document-photo-container">
          {application.transactionRequirements.map((reqr, index) => (
            <Route
              key={`route-${reqr.requirementName}-${index}`}
              path={
                location.state.role === "applicant"
                  ? `/main/applications/${application._id}/${index}`
                  : `/reviewer/applications/${application._id}/${index}`
              }
            >
              {location.state.role === "applicant" && (
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
                          // add to documents collection
                          axios.post("http://localhost:1337/api/documents", {
                            applicantId: application.applicantId,
                            docType: reqr.requirementName,
                            documentUrl: res.data.filename,
                            dateUploaded: Date.now(),
                          });
                          // edit applications collection
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
              )}
              <img
                src={`http://localhost:1337/Uploads/${reqr.requirementUrl}`}
                alt="document"
              />
            </Route>
          ))}
          <Route path={`/reviewer/applications/${application._id}/receipt`}>
            <img
              src={`http://localhost:1337/Receipts/${application.paymentReceiptUrl}`}
              alt="receipt"
            />
          </Route>
        </div>
      </div>
      {location.state.role === "applicant" && (
        <div className="send-application">
          <button onClick={sendApplicationClickHandler}>
            Send Application
          </button>
          {application.transactionStatus !== "pending" ||
            (application.transactionStatus !== "-" && (
              <span>Application sent!</span>
            ))}
        </div>
      )}
      <div className="remarks-wrapper">
        <div className="application-remarks">
          <p className="inner-header">remarks</p>
          <p className="remarks">{application.remarks}</p>
        </div>
        <div className="reviewer-remarks">
          {location.state.role === "reviewer" && (
            <>
              <div className="reviewer-input-group">
                <label htmlFor="reviewer-payment-status">payment status</label>
                <select
                  id="reviewer-payment-status"
                  value={reviewerPaymentStatus}
                  onChange={(e) => setReviewerPaymentStatus(e.target.value)}
                >
                  <option value="accepted">accepted</option>
                  <option value="rejected">rejected</option>
                </select>
              </div>
              <div className="reviewer-input-group">
                <label htmlFor="reviewer-transaction-status">
                  transaction status
                </label>
                <select
                  id="reviewer-transaction-status"
                  value={reviewerTransactionStatus}
                  onChange={(e) => setReviewerTransactionStatus(e.target.value)}
                >
                  <option value="set appointment date">
                    set appointment date
                  </option>
                  <option value="to resubmit requirements">
                    to resubmit requirements
                  </option>
                </select>
              </div>
              <div className="reviewer-input-group">
                <label htmlFor="reviewer-remarks">remarks</label>
                <textarea
                  name=""
                  id="reviewer-remarks"
                  cols="30"
                  rows="10"
                  value={reviewerRemarks}
                  onChange={(e) => setReviewerRemarks(e.target.value)}
                ></textarea>
              </div>
              <div className="reviewer-input-group">
                <div></div>
                <div className="reviewer-status-button">
                  <button onClick={reviewerButtonClickHandler}>
                    Update Application
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationDetailTab;
