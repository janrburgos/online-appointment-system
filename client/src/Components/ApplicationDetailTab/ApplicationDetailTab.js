import "./ApplicationDetailTab.css";
import React, { useLocation } from "react-router-dom";
import moment from "moment";

const ApplicationDetailTab = () => {
  const location = useLocation();
  const application = location.state;
  console.log(application);
  return (
    <div className="ApplicationDetailTab">
      <div className="application-top">
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
  );
};

export default ApplicationDetailTab;
