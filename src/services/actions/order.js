import {PLACED_ORDER_ERROR, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS} from "./placed-order";
import {DOMAIN} from "../../utils/domain";
import {checkResponse} from "../../utils/network";

export const ORDER_INGREDIENT_ADD = 'ORDER_INGREDIENT_ADD';
export const ORDER_INGREDIENT_REMOVE = 'ORDER_INGREDIENT_REMOVE';
export const ORDER_RESET = 'ORDER_RESET';
export const ORDER_MOVE_INGREDIENT = 'ORDER_SWAP_INGREDIENTS';

export function placeOrder(order) {
  return dispatch => {
    dispatch({type: PLACED_ORDER_REQUEST});

    fetch(`${DOMAIN}/api/orders`, {
        method: 'POST',
        body: JSON.stringify({
          ingredients: [
            order.bun,
            ...order.mainsAndSauces,
            order.bun
          ].map(ingredient => ingredient._id)
        }),
        headers: {
          'content-type': 'application/json'
        }
      }
    ).then(checkResponse)
      .then(res => {
        dispatch({type: PLACED_ORDER_SUCCESS, order: res.order});
        dispatch({type: ORDER_RESET});
      })
      .catch(error => dispatch({type: PLACED_ORDER_ERROR, error}));
  }
}