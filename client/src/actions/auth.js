import api from "../util/api";
import {
  USER_AUTH,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGOUT,
} from "./type";
import { setAlert } from "./alert";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/auth");
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
  const body = { email, password };

  try {
    const res = await api.post("/users/auth", body);

    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

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
