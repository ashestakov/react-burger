import {combineReducers} from "redux";
import ingredients, {Ingredient} from "./ingredients";
import order from "./order";
import placedOrder from "./placed-order";
import {auth} from "./auth";
import {Order, PlacedOrder} from "../actions/order";

export type RootState = {
    ingredients: {
        ingredients: Ingredient[]
    };
    order: Order;
    placedOrder: {
        order: PlacedOrder
    };
    auth: {
        user: {
            email: string,
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
    auth
})

export default rootReducer;