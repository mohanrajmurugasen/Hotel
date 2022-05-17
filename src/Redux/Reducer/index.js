import { combineReducers } from "redux";
import { homeReducer } from "./Reducer";

const store = combineReducers({
  addHome: homeReducer,
});

export default store;
