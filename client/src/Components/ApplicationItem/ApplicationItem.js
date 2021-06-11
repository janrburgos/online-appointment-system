import "./ApplicationItem.css";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const ApplicationItem = (props) => {
  const [application, setApplication] = useState(props.application);
  let receiptHandler = useRef(null);

  return (
    <div className="ApplicationItem">
      <div className="application-card">
        <div className="application-buttons">
          <Link
            to={{
              pathname: `/main/applications/${application._id}/0`,
              state: {
                ...application,
              },
            }}
            onClick={() => localStorage.setItem("selectedDocumentIndex", 0)}
          >
            <button>view details</button>
          </Link>
          <div className="receipt-button">
            {application.paymentStatus !== "accepted" && (
              <input
                type="file"
                id="payment-receipt"
                accept="image/*"
                ref={receiptHandler}
                onInput={() => {
                  let receipt = receiptHandler.current.files[0];
                  let param = new FormData();
                  param.append("receipt", receipt, receipt.name);
                  param.append("chunk", "0");
                  let config = {
                    headers: { "Content-Type": "multipart/form-data" },
                  };
                  axios
                    .post(
                      "http://localhost:1337/api/upload/receipt",
                      param,
                      config
                    )
                    .then((res) => {
                      axios
                        .put(
                          `http://localhost:1337/api/applications/${application._id}`,
                          {
                            paymentReceiptUrl: res.data.filename,
                            paymentStatus: "pending",
                          }
                        )
                        .then((res) => {
                          setApplication(res.data);
                        });
                    });
                }}
              />
            )}
            {application.paymentStatus === "-" ||
            application.paymentStatus === "rejected" ? (
              <div>
                <span className="left-arrow">&#8592;</span>
                <span className="up-arrow">&#8593;</span> Upload Your Receipt
              </div>
            ) : (
              <div>Receipt Uploaded! </div>
            )}
          </div>
        </div>
        <div className="application-middle">
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
      </div>
    </div>
  );
};

export default ApplicationItem;
