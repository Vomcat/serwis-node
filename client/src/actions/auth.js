import axios from "axios";
import {
  USER_AUTH,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGOUT,
} from "./type";
import { setAlert } from "./alert";
import AuthToken from "../util/AuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    AuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("api/users/auth");
    dispatch({
      type: USER_AUTH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/auth", body, config);

    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlert("Błędne dane", "Ok"));
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
//Wylogowanie

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
