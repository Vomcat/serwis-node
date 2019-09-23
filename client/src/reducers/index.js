import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import repairs from "./repairs";

export default combineReducers({ alert, auth, repairs });
