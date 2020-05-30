import {
  ADD_USER,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  USER_ERROR,
  EDIT_USER,
  EDIT_USER_PASSWORD,
} from "../actions/type";

const initialState = {
  users: [],
  user: null,
  error: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
    case EDIT_USER:
    case EDIT_USER_PASSWORD:
      return {
        ...state,
        user: [...state.users, payload],
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };

    case USER_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
