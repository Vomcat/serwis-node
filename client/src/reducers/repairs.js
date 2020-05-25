import {
  ADD_REPAIR,
  GET_REPAIR,
  GET_REPAIRS,
  DELETE_REPAIR,
  REPAIR_ERROR,
} from "../actions/type";

const initialState = {
  repair: null,
  repairs: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_REPAIR:
      return {
        ...state,
        repair: [...state.repairs, payload],
      };

    case GET_REPAIR:
      return {
        ...state,
        repair: payload,
      };
    case GET_REPAIRS:
      return {
        ...state,
        repairs: payload,
      };
    case DELETE_REPAIR:
      return {
        ...state,
        repairs: state.repairs.filter((repair) => repair._id !== payload),
      };
    case REPAIR_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
