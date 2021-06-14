import { createStore, combineReducers } from "redux";
import applicantInfoReducer from "./Reducers/applicantInfoReducer";
import applicationsReducer from "./Reducers/applicationsReducer";
import pendingApplicationsReducer from "./Reducers/pendingApplicationsReducer";
import doctypesReducer from "./Reducers/doctypesReducer";
import highlightedNavReducer from "./Reducers/highlightedNavReducer";

const store = createStore(
  combineReducers({
    applicantInfoReducer,
    applicationsReducer,
    pendingApplicationsReducer,
    doctypesReducer,
    highlightedNavReducer,
  })
);

export default store;
