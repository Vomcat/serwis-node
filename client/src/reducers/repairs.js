import {
  ADD_REPAIR,
  UPDATE_REPAIR,
  GET_REPAIR,
  GET_REPAIRS,
  DELET_REPAIR,
  REPAIR_ERROR
} from "../actions/type";

const initialState = {
  repairs: [],
  repair: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_REPAIR:
      return {
        ...state,
        repairs: payload,
        loading: false
      };
    case UPDATE_REPAIR:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case GET_REPAIR:
      return {
        ...state,
        repair: payload,
        loading: false
      };
    case GET_REPAIRS:
      return {
        ...state,
        repairs: payload,
        loading: false
      };
    case DELET_REPAIR:
      return {
        ...state,
        repairs: state.repairs.filter(repair => repair._id !== payload),
        loading: false
      };
    case REPAIR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
