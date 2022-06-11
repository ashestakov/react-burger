import {PLACED_ORDER_SUCCESS, PLACED_ORDER_RESET, PLACED_ORDER_ERROR} from "../actions/placed-order";

export default function placedOrder(state = null, action) {
  switch (action.type) {
    case PLACED_ORDER_SUCCESS:
      return action.order;
    case PLACED_ORDER_ERROR:
      return null;
    case PLACED_ORDER_RESET:
      return null;
    default:
      return state;
  }
}