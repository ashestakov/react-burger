import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE, ORDER_RESET, ORDER_MOVE_INGREDIENT} from "../actions/order";
import {Ingredient} from "../../types/ingredient";

const ORDER_INITIAL_STATE = {bun: null, mainsAndSauces: []};

type OrderAction = {
  type: string
}

interface OrderActionAdd extends OrderAction {
  ingredient: Ingredient
}

interface OrderActionMove extends OrderAction {
  newIndex: number,
  oldIndex: number
}

interface OrderActionRemove extends OrderAction {
  index: number
}

export default function order(state = ORDER_INITIAL_STATE, action: OrderAction) {
  switch (action.type) {
    case ORDER_INGREDIENT_ADD:
      const {ingredient} = action as OrderActionAdd;
      if (ingredient.type === 'bun') {
        return {
          ...state,
          bun: ingredient,
          mainsAndSauces: state.mainsAndSauces
        }
      } else {
        return {
          ...state,
          bun: state.bun,
          mainsAndSauces: [...state.mainsAndSauces, ingredient]
        }
      }

    case ORDER_INGREDIENT_REMOVE:
      const {index} = action as OrderActionRemove;
      return {
        ...state,
        bun: state.bun,
        mainsAndSauces: state.mainsAndSauces.filter((ingredient, i) => i !== index)
      }
    case ORDER_RESET:
      return ORDER_INITIAL_STATE;
    case ORDER_MOVE_INGREDIENT:
      const {newIndex, oldIndex} = action as OrderActionMove;
      const ingredientAtIndex = state.mainsAndSauces[oldIndex];
      const mainsAndSaucesWithoutIngredient = state.mainsAndSauces.filter((ingredient, index) => index !== oldIndex);

      const isMovingFromTop = newIndex > oldIndex;
      const targetIngredientIndexDelta = isMovingFromTop ? 1 : 0;

      return {
        ...state,
        bun: state.bun,
        mainsAndSauces: [
          ...mainsAndSaucesWithoutIngredient.slice(0, newIndex + targetIngredientIndexDelta),
          ingredientAtIndex,
          ...mainsAndSaucesWithoutIngredient.slice(newIndex + targetIngredientIndexDelta)
        ]
      }
    default:
      return state;
  }
}