import {ORDER_INGREDIENT_ADD, ORDER_RESET} from "./order";
import {INGREDIENTS_ERROR, INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS} from "./ingredients";
import {PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, PLACED_ORDER_ERROR} from "./placed-order";

const DOMAIN = 'https://norma.nomoreparties.space';

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function getIngredients() {
  return dispatch => {
    dispatch({type: INGREDIENTS_REQUEST});

    fetch(`${DOMAIN}/api/ingredients`)
      .then(checkResponse)
      .then(res => {
        dispatch({type: INGREDIENTS_SUCCESS, ingredients: res.data});
        dispatch({type: ORDER_INGREDIENT_ADD, ingredient: res.data[0]});
      })
      .catch(error => dispatch({type: INGREDIENTS_ERROR, error}));
  }
}

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