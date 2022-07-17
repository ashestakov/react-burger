import {INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR} from "../actions/ingredients";

const INITIAL_STATE = {
  ingredients: [],
  makingRequest: false,
  requestFailed: false
};

export type IngredientType = "bun" | "main" | "sauce";

export type IngredientStatKey = "calories" | "proteins" | "fat" | "carbohydrates";

export type Ingredient = {
  _id: string,
  type: IngredientType,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number
} & {
  [statKeyName in IngredientStatKey]: number
}

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