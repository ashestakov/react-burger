import {ADD_INGREDIENT, REMOVE_INGREDIENT, RESET} from "../actions/order";

const ORDER_INITIAL_STATE = {bun: null, mainsAndSauces: []};

export default function order(state = ORDER_INITIAL_STATE, action) {
  const ingredient = action.payload;
  switch (action.type) {
    case ADD_INGREDIENT:
      if (ingredient.type === 'bun') {
        return {
          bun: ingredient,
          mainsAndSauces: state.mainsAndSauces
        }
      } else {
        return {
          bun: state.bun,
          mainsAndSauces: [...state.mainsAndSauces, ingredient]
        }
      }

    case REMOVE_INGREDIENT:
      return {
        bun: state.order.bun,
        mainsAndSauces: state.mainsAndSauces.filter((ingredient, index) => index !== action.payload)
      }
    case RESET:
      return ORDER_INITIAL_STATE;
    default:
      return state;
  }
}