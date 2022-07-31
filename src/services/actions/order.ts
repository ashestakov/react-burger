import {PLACED_ORDER_ERROR, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS} from "./placed-order";
import {DOMAIN} from "../../utils/domain";
import {checkResponse} from "../../utils/network";
import {AppDispatch} from "../../hooks";
import {Order} from "../../types/order";
import {AnyAction} from "redux";
export const ORDER_INGREDIENT_ADD = 'ORDER_INGREDIENT_ADD';
export const ORDER_INGREDIENT_REMOVE = 'ORDER_INGREDIENT_REMOVE';
export const ORDER_RESET = 'ORDER_RESET';
export const ORDER_MOVE_INGREDIENT = 'ORDER_SWAP_INGREDIENTS';

export type OrderAction = AnyAction & {
  type: typeof ORDER_INGREDIENT_ADD | typeof ORDER_INGREDIENT_REMOVE | typeof ORDER_RESET | typeof ORDER_MOVE_INGREDIENT;
}

export function placeOrder(order: Order, accessToken: string) {
  return (dispatch: AppDispatch) => {
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
          'content-type': 'application/json',
          'authorization': accessToken
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