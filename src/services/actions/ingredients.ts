import {DOMAIN} from "../../utils/domain";
import {checkResponse} from "../../utils/network";
import {AppDispatch} from "../../hooks";
import {AnyAction} from "redux";

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';

export type IngredientAction = AnyAction & {
  type: typeof INGREDIENTS_REQUEST | typeof INGREDIENTS_SUCCESS | typeof INGREDIENTS_ERROR;
}

export function getIngredients() {
  return (dispatch: AppDispatch) => {
    dispatch({type: INGREDIENTS_REQUEST});

    fetch(`${DOMAIN}/api/ingredients`)
      .then(checkResponse)
      .then(res => {
        dispatch({type: INGREDIENTS_SUCCESS, ingredients: res.data});
      })
      .catch(error => dispatch({type: INGREDIENTS_ERROR, error}));
  }
}