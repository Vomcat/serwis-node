import axios from "axios";
import store from "../store";
import { LOGOUT } from "../actions/type";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.msg === "Token nie działa") {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
