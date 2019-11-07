import { combineReducers } from "redux";
import memos from "./memos";
import share from "./share";

const rootReducer = combineReducers({
  memos,
  share
});

export default rootReducer;
