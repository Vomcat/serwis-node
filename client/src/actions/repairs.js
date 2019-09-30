import axios from "axios";
import { setAlert } from "./alert";

import { GET_REPAIRS, GET_REPAIR, REPAIR_ERROR, ADD_REPAIR } from "./type";

//wszystkie naprawy

export const getAllRepairs = () => async dispatch => {
  try {
    const res = await axios.get("api/repairs/");
    console.log("this is a sever response", res.data);
    dispatch({
      type: GET_REPAIRS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getRepair = () => async dispatch => {
  try {
    const res = await axios.get("api/repairs/");
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
        edit ? "Zmiany zostały wprowadzone" : "Utworzono naprawę",
        "success"
      )
    );

    if (!edit) {
      history.push("/repairs");
    }
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
