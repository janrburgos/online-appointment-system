import "./ApplicationItem.css";
import moment from "moment";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import axios from "axios";

const ApplicationItem = ({ application }) => {
  const [paymentStatus, setPaymentStatus] = useState(application.paymentStatus);
  let receiptHandler = useRef(null);
  return (
    <div className="ApplicationItem">
      <div className="application-card">
        <div className="application-button">
          <Link
            to={{
              pathname: `/main/applications/${application._id}/0`,
              state: { ...application },
            }}
          >
            <button>view details</button>
          </Link>
          ||
          {paymentStatus === "-" || paymentStatus === "rejected" ? (
            <span>Upload Receipt: </span>
          ) : (
            <span>Receipt Uploaded! </span>
          )}
          {paymentStatus !== "accepted" && (
            <input
              type="file"
              id="payment-receipt"
              accept="image/*"
              ref={receiptHandler}
              onInput={() => {
                console.log(application.paymentReceiptUrl !== "");
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
                        setPaymentStatus(res.data.paymentStatus);
                      });
                  });
              }}
            />
          )}
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
                <td>
                  <b>{moment(application.transactionDate).format("lll")}</b>
                </td>
              </tr>
              <tr>
                <td>Transaction Status:</td>
                <td>{application.transactionStatus}</td>
              </tr>
            </tbody>
          </table>
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
                <td>{application.appointmentDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
