import { combineReducers } from "redux";
import auth from "./auth";
import repairs from "./repairs";
import users from "./users";

export default combineReducers({ auth, repairs, users });
