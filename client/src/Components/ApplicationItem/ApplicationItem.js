import "./ApplicationItem.css";
import moment from "moment";
import { Link } from "react-router-dom";

const ApplicationItem = ({ application }) => {
  return (
    <div className="ApplicationItem">
      <div className="application-card">
        <div className="application-button">
          {/* <Link to={`/main/applications/${application._id}`}> */}
          <Link
            to={{
              pathname: `/main/applications/${application._id}`,
              state: { ...application },
            }}
          >
            <button>view details</button>
          </Link>
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
