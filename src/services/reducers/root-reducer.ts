import {combineReducers} from "redux";
import ingredients from "./ingredients";
import order from "./order";
import placedOrder from "./placed-order";
import {auth} from "./auth";
import {Ingredient} from "../../types/ingredient";
import {HistoryOrder, Order, PlacedOrder} from "../../types/order";
import {wsReducer} from "./websocket";

export type RootState = {
  ingredients: {
    ingredients: Ingredient[]
  };
  orderHistory: {
    orders: HistoryOrder[];
    totalToday: number;
    total: number
  };
  order: Order;
  placedOrder: {
    order: PlacedOrder
  };
  auth: {
    user: {
      email: string;
      name: string
    },
    accessToken: string;
    refreshToken: string;
    passwordResetRequestSuccess: boolean;
  }
}

const rootReducer = combineReducers({
  ingredients,
  order,
  placedOrder,
  auth,
  orderHistory: wsReducer
})

export default rootReducer;