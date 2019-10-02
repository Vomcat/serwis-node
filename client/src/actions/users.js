import axios from "axios";
import { ADD_USER_SUCCES, USER_ERROR, GET_USERS, DELETE_USER } from "./type";
import { setAlert } from "./alert";

export const add = ({ formData, history }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/users", formData, config);

    dispatch({
      type: ADD_USER_SUCCES,
      payload: res.data
    });
    dispatch(setAlert("Dodano nowego użytkownika"));

    history.push("/users");
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get("api/users");
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
};

export const deleteUser = id => async dispatch => {
  if (window.confirm("Napewno usunąć? "))
    try {
      const res = await axios.delete(`api/users/${id}`);

      dispatch({
        type: DELETE_USER,
        payload: id
      });
      dispatch(setAlert("Użytkowinik usunięty", "success"));
    } catch (err) {
      console.log(err);
    }
};
