import {AnyAction} from "redux";

export const PLACED_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACED_ORDER_ERROR = "PLACED_ORDER_ERROR";
export const PLACED_ORDER_REQUEST = "PLACED_ORDER_REQUEST";
export const PLACED_ORDER_RESET = "PLACED_ORDER_RESET";

export type PlacedOrderAction = AnyAction & {
  type: typeof PLACED_ORDER_SUCCESS | typeof PLACED_ORDER_ERROR | typeof PLACED_ORDER_REQUEST | typeof PLACED_ORDER_RESET;
}