import {DOMAIN} from "../../utils/domain";
import {checkResponse} from "../../utils/network";
import {ORDER_INGREDIENT_ADD} from "./order";

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';

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