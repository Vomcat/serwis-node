import {
  ADD_USER,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  USER_ERROR,
} from "../actions/type";

const initialState = {
  users: [],
  user: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
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
