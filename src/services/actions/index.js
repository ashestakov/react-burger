import {ORDER_INGREDIENT_ADD, ORDER_RESET} from "./order";
import {INGREDIENTS_ERROR, INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS} from "./ingredients";
import {PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, PLACED_ORDER_ERROR} from "./placed-order";
import {DOMAIN} from "../../utils/domain";
import {checkResponse} from "../../utils/network";
import {
  GET_ACCESS_TOKEN_ERROR,
  GET_ACCESS_TOKEN_REQUEST,
  GET_ACCESS_TOKEN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  INITIATE_PASSWORD_RESET_ERROR,
  INITIATE_PASSWORD_RESET_REQUEST,
  INITIATE_PASSWORD_RESET_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  LOAD_USER_ERROR,
  PATCH_USER_ERROR,
  LOGOUT_SUCCESS,
  SET_REFRESH_TOKEN,
  FINALIZE_PASSWORD_RESET_REQUEST,
  FINALIZE_PASSWORD_RESET_SUCCESS,
  FINALIZE_PASSWORD_RESET_ERROR
} from "./auth";

function saveRefreshToken(refreshToken) {
  localStorage.setItem('refreshToken', refreshToken);
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

export function login(email, password, callback) {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST});

    fetch(`${DOMAIN}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(checkResponse)
      .then(({accessToken, refreshToken, user}) => {
          saveRefreshToken(refreshToken);
          dispatch({type: LOGIN_SUCCESS, accessToken, refreshToken, user});
          if (callback){
            callback();
          }
        }
      ).catch(error => dispatch({type: LOGIN_ERROR, error}));
  }
}

export function register(name, email, password) {
  return dispatch => {
    dispatch({type: REGISTER_REQUEST});

    fetch(`${DOMAIN}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(checkResponse)
      .then(({user, accessToken, refreshToken}) => {
          saveRefreshToken(refreshToken);
          dispatch({type: REGISTER_SUCCESS, user, accessToken, refreshToken});
        }
      ).catch(error => dispatch({type: REGISTER_ERROR, error}));
  }
}

export function initiatePasswordReset(email) {
  return dispatch => {
    dispatch({type: INITIATE_PASSWORD_RESET_REQUEST});

    fetch(`${DOMAIN}/api/password-reset`, {
      method: 'POST',
      body: JSON.stringify({email}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(checkResponse)
      .then(() => {
        dispatch({type: INITIATE_PASSWORD_RESET_SUCCESS});
      })
      .catch(error => dispatch({type: INITIATE_PASSWORD_RESET_ERROR, error}));
  }
}

export function finalizePasswordReset(password, token) {
  return dispatch => {
    dispatch({type: FINALIZE_PASSWORD_RESET_REQUEST});

    fetch(`${DOMAIN}/api/password-reset/reset`, {
      method: 'POST',
      body: JSON.stringify({password, token}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(checkResponse)
      .then(() => {
        dispatch({type: FINALIZE_PASSWORD_RESET_SUCCESS});
      })
      .catch(error => dispatch({type: FINALIZE_PASSWORD_RESET_ERROR, error}));
  }
}

export function logout(refreshToken) {
  return dispatch => {
    dispatch({type: LOGOUT_REQUEST});

    fetch(`${DOMAIN}/api/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({token: refreshToken}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(checkResponse)
      .then(() => {
        dispatch({type: LOGOUT_SUCCESS});
      })
      .catch(error => dispatch({type: LOGOUT_ERROR, error}));
  }
}

export function getAccessToken() {
  return (dispatch, getState) => {
    const {refreshToken} = getState().auth;
    dispatch({type: GET_ACCESS_TOKEN_REQUEST});

    return fetch(`${DOMAIN}/api/auth/token`, {
      method: 'POST',
      body: JSON.stringify({token: refreshToken}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(checkResponse)
      .then(({accessToken, refreshToken}) => {
          saveRefreshToken(refreshToken);
          dispatch({type: GET_ACCESS_TOKEN_SUCCESS, accessToken, refreshToken});
        }
      ).catch(error => dispatch({type: GET_ACCESS_TOKEN_ERROR, error}));
  }
}

export function loadUser() {
  return async (dispatch, getState) => {
    let {accessToken, refreshToken} = getState().auth;
    dispatch({type: LOAD_USER_REQUEST});

    if (!accessToken) {
      if (!refreshToken) {
        dispatch(initializeAuth());
      }
      await dispatch(getAccessToken());
      accessToken = getState().auth.accessToken;
    }

    return fetch(`${DOMAIN}/api/auth/user`, {
      headers: {
        'authorization': accessToken
      }
    }).then(checkResponse)
      .then(({user}) => {
          dispatch({type: LOAD_USER_SUCCESS, user})
        }
      ).catch(error => dispatch({type: LOAD_USER_ERROR, error}))
  }
}

export function patchUser(accessToken, user) {
  return dispatch => {
    dispatch({type: PATCH_USER_REQUEST})

    fetch(`${DOMAIN}/api/auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
          'authorization': accessToken,
          'content-type': 'application/json'
        }
      }
    ).then(checkResponse)
      .then(({user}) => {
          dispatch({type: PATCH_USER_SUCCESS, user})
        }
      ).catch(error => dispatch({type: PATCH_USER_ERROR, error}))
  }
}

export function initializeAuth() {
  return dispatch => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch({type: SET_REFRESH_TOKEN, refreshToken});
  }
}