import {combineReducers} from "redux";
import ingredients from "./ingredients";
import order from "./order";
import modalIngredient from "./modal-ingredient";
import placedOrder from "./placed-order";

export default combineReducers({
    ingredients,
    order,
    modalIngredient,
    placedOrder
})