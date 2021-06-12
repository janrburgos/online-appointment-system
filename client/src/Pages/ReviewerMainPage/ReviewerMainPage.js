import "./ReviewerMainPage.css";
import ApplicationsTab from "../../Components/ApplicationsTab/ApplicationsTab";
import { useDispatch } from "react-redux";
import axios from "axios";

const ReviewerMainPage = () => {
  const dispatch = useDispatch();

  axios(`http://localhost:1337/api/applications/review/pending`).then((res) =>
    dispatch({ type: "INSERT_APPLICATIONS", payload: res.data })
  );

  return (
    <div className="ReviewerMainPage">
      <ApplicationsTab role={"reviewer"} />
    </div>
  );
};

export default ReviewerMainPage;
