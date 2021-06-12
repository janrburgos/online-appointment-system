import { createStore, combineReducers } from "redux";
import applicantInfoReducer from "./Reducers/applicantInfoReducer";
import applicationsReducer from "./Reducers/applicationsReducer";
import pendingApplicationsReducer from "./Reducers/pendingApplicationsReducer";
import doctypesReducer from "./Reducers/doctypesReducer";

const store = createStore(
  combineReducers({
    applicantInfoReducer,
    applicationsReducer,
    pendingApplicationsReducer,
    doctypesReducer,
  })
);

export default store;
