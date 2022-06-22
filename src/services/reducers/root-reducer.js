import {combineReducers} from "redux";
import ingredients from "./ingredients";
import order from "./order";
import modalIngredient from "./modal-ingredient";
import placedOrder from "./placed-order";
import {auth} from "./auth";

export default combineReducers({
    ingredients,
    order,
    modalIngredient,
    placedOrder,
    auth
})