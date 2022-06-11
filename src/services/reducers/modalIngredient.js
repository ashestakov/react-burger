import {MODAL_INGREDIENT_SET, MODAL_INGREDIENT_RESET} from "../actions/modalIngredient";

const INITIAL_STATE = null;

export default function modalIngredient(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MODAL_INGREDIENT_SET:
      return action.ingredient;
    case MODAL_INGREDIENT_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
}