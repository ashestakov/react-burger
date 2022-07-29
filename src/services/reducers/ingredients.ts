import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from "../actions/ingredients";
import {Ingredient} from "../../types/ingredient";

const INITIAL_STATE = {
  ingredients: [],
  makingRequest: false,
  requestFailed: false
};

type IngredientsAction = {
  type: string,
  ingredients?: Ingredient[],
  error?: any
}

export default function ingredients(state = INITIAL_STATE, action: IngredientsAction) {
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