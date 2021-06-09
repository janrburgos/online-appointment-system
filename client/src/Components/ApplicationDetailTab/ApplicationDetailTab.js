import "./ApplicationDetailTab.css";
import { Route, Link, useLocation } from "react-router-dom";
import React, { useState, useRef } from "react";
import moment from "moment";
import axios from "axios";

const ApplicationDetailTab = () => {
  const location = useLocation();
  const [application, setApplication] = useState({ ...location.state });
  let fileHandler = useRef(null);
  return (
    <div className="ApplicationDetailTab">
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
      <div className="application-detail-bottom">
        <div className="requirement-list">
          <ul>
            {application.transactionRequirements.map((reqr, index) => (
              <Link
                key={`link-${index}-${reqr.requirementName}`}
                to={{
                  pathname: `/main/applications/${application._id}/${index}`,
                  state: { ...application },
                }}
              >
                <li>{reqr.requirementName}</li>
              </Link>
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
                  accept=".jpg,.jpeg,.png,.bmp"
                />
                <button
                  onClick={() => {
                    console.log(reqr.requirementName);
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
                >
                  save image
                </button>
              </div>
              <img
                src={`http://localhost:1337/Uploads/${reqr.requirementUrl}`}
                alt="document"
              />
            </Route>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailTab;
