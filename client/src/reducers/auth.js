import {
  USER_AUTH,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  users: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };

    case LOGIN_SUCCES:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
