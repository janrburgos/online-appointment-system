import { createStore, combineReducers } from "redux";
import applicantInfoReducer from "./Reducers/applicantInfoReducer";
import applicationsReducer from "./Reducers/applicationsReducer";
import doctypesReducer from "./Reducers/doctypesReducer";

const store = createStore(
  combineReducers({
    applicantInfoReducer,
    applicationsReducer,
    doctypesReducer,
  })
);

export default store;
