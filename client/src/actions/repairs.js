import api from "../util/api";
import { setAlert } from "./alert";

import {
  GET_REPAIRS,
  GET_REPAIR,
  REPAIR_ERROR,
  ADD_REPAIR,
  DELETE_REPAIR,
} from "./type";

//wszystkie naprawy

export const getAllRepairs = () => async (dispatch) => {
  try {
    const res = await api.get("/repairs");
    dispatch({
      type: GET_REPAIRS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
    });
  }
};

export const getRepair = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/repairs/${id}`);

    dispatch({
      type: GET_REPAIR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
    });
  }
};

export const addNewRepair = (formData, history) => async (dispatch) => {
  try {
    const res = await api.post("/repairs", formData);
    dispatch({
      type: ADD_REPAIR,
      payload: res.data,
    });

    dispatch(setAlert("Utworzono naprawę", "success"));

    history.push("/repairs");
  } catch (err) {
    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

export const updateRepair = (id, formData, history) => async (dispatch) => {
  try {
    const res = await api.put(`/repairs/${id}`, formData);
    dispatch({
      type: ADD_REPAIR,
      payload: res.data,
    });

    dispatch(setAlert(("Zmiany zostały wprowadzone", "success")));

    history.push("/repairs");
  } catch (err) {
    console.log(err);
    dispatch({
      type: REPAIR_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

export const deleteRepair = (id) => async (dispatch) => {
  if (window.confirm("Napewno usunąć? "))
    try {
      const res = await api.delete(`/repairs/${id}`);

      dispatch({
        type: DELETE_REPAIR,
        payload: id,
      });
      dispatch(setAlert("Naprawa usunięta"));
    } catch (err) {
      console.log(err);
    }
};
