import axios from "axios";
import {
  ADD_USER_SUCCES,
  ADD_USER_FAIL,
  USER_AUTH,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGOUT
} from "./type";
import { setAlert } from "./alert";
import AuthToken from "../util/AuthToken";

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

export const add = ({
  name,
  first_name,
  last_name,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, first_name, last_name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: ADD_USER_SUCCES,
      payload: res.data
    });
    dispatch(setAlert("Dodano nowego użytkownika", "Naprawa została dodana"));
  } catch (err) {
    dispatch({
      type: ADD_USER_FAIL
    });
  }
};

//login
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlert("Zmiany ", "success"));
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
//Wylogowanie

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
