import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_REPAIRS,
  GET_REPAIR,
  REPAIR_ERROR,
  ADD_REPAIR,
  DELETE_REPAIR,
  UPDATE_REPAIR
} from "./type";

//wszystkie naprawy

export const getAllRepairs = () => async dispatch => {
  try {
    const res = await axios.get("api/repairs");
    dispatch({
      type: GET_REPAIRS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR
    });
  }
};

export const getRepair = id => async dispatch => {
  try {
    const res = await axios.get(`api/repairs/${id}`);
    console.log("this is a sever response", res.data);
    dispatch({
      type: GET_REPAIR,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addNewRepair = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/repairs", formData, config);
    dispatch({
      type: ADD_REPAIR,
      payload: res.data
    });

    dispatch(
      setAlert(
        (edit ? "Zmiany zostały wprowadzone" : "Utworzono naprawę", "success")
      )
    );

    history.push("/repairs");
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.response.status, status: err.response.status }
    });
  }
};

export const deleteRepair = id => async dispatch => {
  if (window.confirm("Napewno usunąć? "))
    try {
      const res = await axios.delete(`api/repairs/${id}`);

      dispatch({
        type: DELETE_REPAIR,
        payload: id
      });
      dispatch(setAlert("Naprawa usunięta", "success"));
    } catch (err) {
      console.log(err);
      // dispatch({
      //   type: REPAIR_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status }
      // });
    }
};
