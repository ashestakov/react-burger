import {INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from "../actions/ingredients";

const INITIAL_STATE = [];

export default function ingredients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INGREDIENTS_SUCCESS:
      return action.ingredients
    case INGREDIENTS_ERROR:
      return INITIAL_STATE
    default:
      return state;
  }
}