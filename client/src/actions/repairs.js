import axios from "axios";
import { setAlert } from "./alert";

import { GET_REPAIRS, REPAIR_ERROR } from "./type";

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
