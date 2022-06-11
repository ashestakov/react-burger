import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE, ORDER_RESET, ORDER_MOVE_INGREDIENT} from "../actions/order";

const ORDER_INITIAL_STATE = {bun: null, mainsAndSauces: []};

export default function order(state = ORDER_INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_INGREDIENT_ADD:
      if (action.ingredient.type === 'bun') {
        return {
          bun: action.ingredient, mainsAndSauces: state.mainsAndSauces
        }
      } else {
        return {
          bun: state.bun, mainsAndSauces: [...state.mainsAndSauces, action.ingredient]
        }
      }

    case ORDER_INGREDIENT_REMOVE:
      return {
        bun: state.bun, mainsAndSauces: state.mainsAndSauces.filter((ingredient, index) => index !== action.index)
      }
    case ORDER_RESET:
      return ORDER_INITIAL_STATE;
    case ORDER_MOVE_INGREDIENT:
      const ingredientAtIndex = state.mainsAndSauces[action.oldIndex];
      const mainsAndSaucesWithoutIngredient = state.mainsAndSauces.filter((ingredient, index) => index !== action.oldIndex);

      const isMovingFromTop = action.newIndex > action.oldIndex;
      const targetIngredientIndexDelta = isMovingFromTop ? 1 : 0;

      return {
        bun: state.bun,
        mainsAndSauces: [
          ...mainsAndSaucesWithoutIngredient.slice(0, action.newIndex + targetIngredientIndexDelta),
          ingredientAtIndex,
          ...mainsAndSaucesWithoutIngredient.slice(action.newIndex + targetIngredientIndexDelta)
        ]
      }
    default:
      return state;
  }
}