import "./ApplicationDetailTab.css";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";

const ApplicationDetailTab = () => {
  const location = useLocation();
  const application = { ...location.state };
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
                key={`link-${index}-${reqr}`}
                to={{
                  pathname: `/main/applications/${application._id}/${index}`,
                  state: { ...application },
                }}
              >
                <li>{reqr}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="document-photo-container">
          <img
            src={`http://localhost:1337/Uploads/no-document.png`}
            alt="document"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailTab;
