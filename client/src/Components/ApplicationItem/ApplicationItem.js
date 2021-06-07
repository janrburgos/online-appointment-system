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
                <td>Transaction Document:</td>
                <td>ENGINE MANAGEMENT LEVEL</td>
              </tr>
              <tr>
                <td>Transaction Date:</td>
                <td>
                  <b>-</b>
                </td>
              </tr>
              <tr>
                <td>Transaction Status:</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>Amount:</td>
                <td>1000.00</td>
              </tr>
              <tr>
                <td>Payment Status:</td>
                <td>
                  <div className="badge badge-primary">CANCELLED</div>
                </td>
              </tr>
              <tr>
                <td>Appointment Date:</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
