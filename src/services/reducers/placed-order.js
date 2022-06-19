import {PLACED_ORDER_SUCCESS, PLACED_ORDER_RESET, PLACED_ORDER_ERROR} from "../actions/placed-order";

const INITIAL_STATE = {
  order: null,
  makingRequest: false,
  requestFailed: false
}

export default function placedOrder(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PLACED_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order,
        makingRequest: false
      };
    case PLACED_ORDER_ERROR:
      return {
        ...state,
        order: null,
        makingRequest: false,
        requestFailed: true
      };
    case PLACED_ORDER_RESET:
      return {
        ...state,
        order: null
      };
    default:
      return state;
  }
}