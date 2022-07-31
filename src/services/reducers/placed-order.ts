import {PLACED_ORDER_SUCCESS, PLACED_ORDER_RESET, PLACED_ORDER_ERROR} from "../actions/placed-order";
import {Order} from "../actions/order";

const INITIAL_STATE = {
  order: null,
  makingRequest: false,
  requestFailed: false
}

type PlacedOrderAction = {
  type: string
}

interface PlacedOrderActionSuccess {
  type: typeof PLACED_ORDER_SUCCESS,
  order: Order
}

export default function placedOrder(state = INITIAL_STATE, action: PlacedOrderAction) {
  switch (action.type) {
    case PLACED_ORDER_SUCCESS:
      const {order} = action as PlacedOrderActionSuccess;
      return {
        ...state,
        order: order,
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