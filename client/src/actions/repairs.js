import api from "../util/api";

import {
  GET_REPAIRS,
  GET_REPAIR,
  REPAIR_ERROR,
  ADD_REPAIR,
  DELETE_REPAIR,
} from "./type";

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
    } catch (err) {
      console.log(err);
    }
};
