import { createStore, combineReducers } from "redux";
import applicantInfoReducer from "./Reducers/applicantInfoReducer";

const store = createStore(combineReducers({ applicantInfoReducer }));

export default store;
