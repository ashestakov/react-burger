import {SET_MODAL_INGREDIENT, UNSET_MODAL_INGREDIENT} from "../actions/modalIngredient";

const INITIAL_STATE = {};

export default function modalIngredient(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_MODAL_INGREDIENT:
      return action.payload;
    case UNSET_MODAL_INGREDIENT:
      return INITIAL_STATE;
    default:
      return state;
  }
}