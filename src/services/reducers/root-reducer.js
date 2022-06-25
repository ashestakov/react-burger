import {combineReducers} from "redux";
import ingredients from "./ingredients";
import order from "./order";
import placedOrder from "./placed-order";
import {auth} from "./auth";

export default combineReducers({
    ingredients,
    order,
    placedOrder,
    auth
})