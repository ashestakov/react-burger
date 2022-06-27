import {DOMAIN} from "../../utils/domain";
import {checkResponse} from "../../utils/network";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const INITIATE_PASSWORD_RESET_REQUEST = 'INITIATE_PASSWORD_RESET_REQUEST';
export const INITIATE_PASSWORD_RESET_SUCCESS = 'INITIATE_PASSWORD_RESET_SUCCESS';
export const INITIATE_PASSWORD_RESET_ERROR = 'INITIATE_PASSWORD_RESET_ERROR';

export const FINALIZE_PASSWORD_RESET_REQUEST = 'FINALIZE_PASSWORD_RESET_REQUEST';
export const FINALIZE_PASSWORD_RESET_SUCCESS = 'FINALIZE_PASSWORD_RESET_SUCCESS';
export const FINALIZE_PASSWORD_RESET_ERROR = 'FINALIZE_PASSWORD_RESET_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const GET_ACCESS_TOKEN_REQUEST = 'GET_ACCESS_TOKEN_REQUEST';
export const GET_ACCESS_TOKEN_SUCCESS = 'GET_ACCESS_TOKEN_SUCCESS';
export const GET_ACCESS_TOKEN_ERROR = 'GET_ACCESS_TOKEN_ERROR';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_ERROR = 'PATCH_USER_ERROR';

export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

function saveRefreshToken(refreshToken) {
  localStorage.setItem('refreshToken', refreshToken);
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

    let res = await fetch(`${DOMAIN}/api/auth/user`, {
      headers: {
        'authorization': accessToken
      }
    })
    if (res.status === 401 || res.status === 403) {
      // если токен истек, попробуем получить новый
      await dispatch(getAccessToken());
      accessToken = getState().auth.accessToken;
      res = await fetch(`${DOMAIN}/api/auth/user`, {
        headers: {
          'authorization': accessToken
        }
      })
      if (res.error) {
        return dispatch({type: LOAD_USER_ERROR, error: res.error});
      }
    }
    const json = await res.json();
    return dispatch({type: LOAD_USER_SUCCESS, user: json.user})
  }
}

export function patchUser(accessToken, user) {
  return async (dispatch, getState) => {
    dispatch({type: PATCH_USER_REQUEST})

    let res = await fetch(`${DOMAIN}/api/auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
          'authorization': accessToken,
          'content-type': 'application/json'
        }
      }
    )

    if (res.status === 401 || res.status === 403) {
      // если токен истек, попробуем получить новый
      await dispatch(getAccessToken());
      accessToken = getState().auth.accessToken;
      res = await fetch(`${DOMAIN}/api/auth/user`, {
          method: 'PATCH',
          body: JSON.stringify(user),
          headers: {
            'authorization': accessToken,
            'content-type': 'application/json'
          }
        }
      )
      if (res.error) {
        return dispatch({type: PATCH_USER_ERROR, error: res.error});
      }
    }
    const json = await res.json();
    return dispatch({type: PATCH_USER_SUCCESS, user: json.user})
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST});

    return fetch(`${DOMAIN}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(checkResponse)
      .then(({accessToken, refreshToken, user}) => {
          saveRefreshToken(refreshToken);
          dispatch({type: LOGIN_SUCCESS, accessToken, refreshToken, user});
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

export function initializeAuth() {
  return dispatch => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch({type: SET_REFRESH_TOKEN, refreshToken});
  }
}