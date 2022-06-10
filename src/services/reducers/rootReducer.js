import {combineReducers} from "redux";
import ingredients from "./ingredients";
import order from "./order";
import modalIngredient from "./modalIngredient";
import modalOrder from "./modalOrder";

export default combineReducers({
    ingredients,
    order,
    modalIngredient,
    modalOrder
})