import { createStore, combineReducers } from "redux";
import counterReducer from "./Reducers/counterReducer";
import numChangeReducer from "./Reducers/numChangeReducer";

const store = createStore(
  combineReducers({ counterReducer, numChangeReducer })
);

export default store;
