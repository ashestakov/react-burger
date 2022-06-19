import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from "../actions/ingredients";

const INITIAL_STATE = {
  ingredients: [],
  makingRequest: false,
  requestFailed: false
};

export default function ingredients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INGREDIENTS_REQUEST:
      return {
        ...state,
        makingRequest: true,
        requestFailed: false
      }
    case INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        makingRequest: false
      }
    case INGREDIENTS_ERROR:
      return {
        ...state,
        ingredients: [],
        makingRequest: false,
        requestFailed: true
      }
    default:
      return state;
  }
}