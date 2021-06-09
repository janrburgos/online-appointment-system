import { createStore, combineReducers } from "redux";
import applicantInfoReducer from "./Reducers/applicantInfoReducer";
import applicationsReducer from "./Reducers/applicationsReducer";
import doctypesReducer from "./Reducers/doctypesReducer";
import counterReducer from "./Reducers/counterReducer";

const store = createStore(
  combineReducers({
    applicantInfoReducer,
    applicationsReducer,
    doctypesReducer,
    counterReducer,
  })
);

export default store;
