import axios from "axios";
import { setAlert } from "./alert";

import { GET_REPAIRS, REPAIR_ERROR, ADD_REPAIR } from "./type";

//wszystkie naprawy

export const getAllRepairs = () => async dispatch => {
  try {
    const res = await axios.get("api/repairs/");
    dispatch({
      type: GET_REPAIRS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.reposne.statusText, status: err.reposne.status }
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
        edit ? "Zmiany zostały wprowadzone" : "Utworzono naprawę",
        "success"
      )
    );

    if (!edit) {
      history.push("/newRepair");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
