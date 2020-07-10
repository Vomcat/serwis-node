import api from "../util/api";
import {
  ADD_USER,
  USER_ERROR,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  EDIT_USER,
  EDIT_USER_PASSWORD,
} from "./type";
import { setAlert } from "./alert";

export const add = ({ formData, history }) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);

    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
    dispatch(setAlert("Dodano nowego użytkownika"));

    history.push("/users");
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    });
  }
};

export const editUser = (id, formData, history) => async (dispatch) => {
  try {
    const res = await api.put(`/users/editUser/${id}`, formData);
    dispatch({
      type: EDIT_USER,
      payload: res.data,
    });

    dispatch(setAlert("Zmiany zostały wprowadzone"));

    history.push("/users");
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

export const editUserPassword = (id, formData, history) => async (dispatch) => {
  try {
    const res = await api.put(`/users/reset/${id}`, formData);
    dispatch({
      type: EDIT_USER_PASSWORD,
      payload: res.data,
    });

    dispatch(setAlert("Zmiany zostały wprowadzone"));

    history.push("/users");
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await api.get("/users");
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  if (window.confirm("Napewno usunąć? "))
    try {
      const res = await api.delete(`/users/${id}`);

      dispatch({
        type: DELETE_USER,
        payload: id,
      });
      dispatch(setAlert("Użytkowinik usunięty", "success"));
    } catch (err) {
      console.log(err);
    }
};
