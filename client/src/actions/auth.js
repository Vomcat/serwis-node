import axios from "axios";
import {
  ADD_USER_SUCCES,
  ADD_USER_FAIL,
  USER_AUTH,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL
} from "./type";
import { setAlert } from "./alert";
import AuthToken from "../util/AuthToken";
import { userInfo } from "os";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    AuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("api/auth");
    dispatch({
      type: USER_AUTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const add = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data
    });
    dispatch(loadUser);
  } catch (err) {
    const errors = err.responde.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//login
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: ADD_USER_SUCCES,
      payload: res.data
    });
    dispatch(loadUser);
  } catch (err) {
    const errors = err.responde.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ADD_USER_FAIL
    });
  }
};
