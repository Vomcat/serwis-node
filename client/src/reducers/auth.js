import {
  ADD_USER_SUCCES,
  ADD_USER_FAIL,
  USER_AUTH,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case LOGIN_SUCCES:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ADD_USER_SUCCES:
      return {
        ...state,
        user: [...state.user, payload],
        loading: false
      };

    case ADD_USER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
