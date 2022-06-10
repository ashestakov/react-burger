import {INGREDIENTS_SUCCESS} from "../actions/ingredients";

const INITIAL_STATE = [];

export default function ingredients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INGREDIENTS_SUCCESS:
      return action.ingredients
    default:
      return state;
  }
}