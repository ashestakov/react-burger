import {combineReducers} from "redux";
import ingredients from "./ingredients";
import order from "./order";
import modalIngredient from "./modalIngredient";
import placedOrder from "./placedOrder";

export default combineReducers({
    ingredients,
    order,
    modalIngredient,
    placedOrder
})