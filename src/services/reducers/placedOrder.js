import {PLACED_ORDER_SUCCESS, PLACED_ORDER_RESET} from "../actions/placedOrder";

export default function placedOrder(state = null, action) {
  switch (action.type) {
    case PLACED_ORDER_SUCCESS:
      return action.order;
    case PLACED_ORDER_RESET:
      return null;
    default:
      return state;
  }
}