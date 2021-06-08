import { createStore, combineReducers } from "redux";
import applicantInfoReducer from "./Reducers/applicantInfoReducer";
import counterReducer from "./Reducers/counterReducer";

const store = createStore(
  combineReducers({ applicantInfoReducer, counterReducer })
);

export default store;
