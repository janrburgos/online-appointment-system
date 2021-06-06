import "./ApplicationItem.css";

const ApplicationItem = () => {
  return (
    <div className="ApplicationItem">
      <div className="application-card">
        <div className="application-button">
          <button>view details</button>
        </div>
        <div className="application-middle">
          <table>
            <tbody>
              <tr>
                <td>
                  <span>
                    <small>Transaction Name:</small>
                  </span>
                </td>
                <td>EXAMINATION</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Transaction Type:</small>
                  </span>
                </td>
                <td>REGULAR</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Transaction Category:</small>
                  </span>
                </td>
                <td>
                  <span>THEORETICAL EXAM</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Transaction Document:</small>
                  </span>
                </td>
                <td>ENGINE MANAGEMENT LEVEL</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Appointment Date:</small>
                  </span>
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <span>
                    <small>Amount:</small>
                  </span>
                </td>
                <td>1000.00</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Transaction Date:</small>
                  </span>
                </td>
                <td>
                  <b>-</b>
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Payment Status:</small>
                  </span>
                </td>
                <td>
                  <div className="badge badge-primary">CANCELLED</div>
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Payment Channel:</small>
                  </span>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Branch:</small>
                  </span>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <small>Schedule Date:</small>
                  </span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="application-status">
          <strong>FOR REQUIREMENTS COMPLETION</strong>
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
