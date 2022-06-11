import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE, ORDER_RESET} from "../actions/order";

const ORDER_INITIAL_STATE = {bun: null, mainsAndSauces: []};

export default function order(state = ORDER_INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_INGREDIENT_ADD:
      if (action.ingredient.type === 'bun') {
        return {
          bun: action.ingredient,
          mainsAndSauces: state.mainsAndSauces
        }
      } else {
        return {
          bun: state.bun,
          mainsAndSauces: [...state.mainsAndSauces, action.ingredient]
        }
      }

    case ORDER_INGREDIENT_REMOVE:
      return {
        bun: state.bun,
        mainsAndSauces: state.mainsAndSauces.filter((ingredient, index) => index !== action.index)
      }
    case ORDER_RESET:
      return ORDER_INITIAL_STATE;
    default:
      return state;
  }
}