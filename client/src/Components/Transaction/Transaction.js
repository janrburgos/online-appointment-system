import "./Transaction.css";
import { useHistory } from "react-router-dom";

const Transaction = () => {
  const history = useHistory();
  const closeButtonClickHandler = () => {
    history.push("/main");
  };

  return (
    <div className="Transaction">
      <div className="transaction-modal">
        <div className="select-title">
          <label htmlFor="select-document">select document</label>
          <select name="select-document" id="select-document">
            <option value="document-1">document 1</option>
            <option value="document-2">document 2</option>
            <option value="document-3">document 3</option>
          </select>
        </div>
        <div className="requirement-box">
          <div className="requirement-title">requirements</div>
          <div className="requirement-list">
            <ul>
              <li>requirement 1</li>
              <li>requirement 2</li>
              <li>requirement 3</li>
            </ul>
          </div>
        </div>
        <div className="transaction-buttons">
          <button>proceed</button>
          <button onClick={closeButtonClickHandler}>close</button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
