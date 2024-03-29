import {DOMAIN} from "../../utils/domain";
import {checkResponse} from "../../utils/network";
import {AppDispatch, AppThunk} from "../../hooks";
import {AnyAction} from "redux";

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

type GetAuth = () => { auth: { accessToken: string, refreshToken: string } };

function saveRefreshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

export type AuthAction = AnyAction & {
  type: typeof LOGIN_REQUEST | typeof LOGIN_SUCCESS | typeof LOGIN_ERROR | typeof REGISTER_REQUEST | typeof REGISTER_SUCCESS | typeof REGISTER_ERROR | typeof INITIATE_PASSWORD_RESET_REQUEST | typeof INITIATE_PASSWORD_RESET_SUCCESS | typeof INITIATE_PASSWORD_RESET_ERROR | typeof FINALIZE_PASSWORD_RESET_REQUEST | typeof FINALIZE_PASSWORD_RESET_SUCCESS | typeof FINALIZE_PASSWORD_RESET_ERROR | typeof LOGOUT_REQUEST | typeof LOGOUT_ERROR | typeof LOGOUT_SUCCESS | typeof GET_ACCESS_TOKEN_REQUEST | typeof GET_ACCESS_TOKEN_SUCCESS | typeof GET_ACCESS_TOKEN_ERROR | typeof LOAD_USER_REQUEST | typeof LOAD_USER_SUCCESS | typeof LOAD_USER_ERROR | typeof PATCH_USER_REQUEST | typeof PATCH_USER_SUCCESS | typeof PATCH_USER_ERROR | typeof SET_REFRESH_TOKEN;
}

export const getAccessToken = (): AppThunk => {
  return (dispatch: AppDispatch, getState: GetAuth) => {
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

export const loadUser = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: GetAuth) => {
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

      return dispatch({type: LOAD_USER_ERROR, error: res.body});
    }
    const json = await res.json();
    return dispatch({type: LOAD_USER_SUCCESS, user: json.user})
  }
}

export type CredentialsDiff = {name?: string, email?: string, password?: string};

export const patchUser = (accessToken: string, user: CredentialsDiff): AppThunk => {
  return async (dispatch: AppDispatch, getState: GetAuth) => {
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
      return dispatch({type: PATCH_USER_ERROR, error: res.body});
    }
    const json = await res.json();
    return dispatch({type: PATCH_USER_SUCCESS, user: json.user})
  }
}

export const login = (email: string, password: string): AppThunk => {
  return (dispatch: AppDispatch) => {
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

export const register = (name: string, email: string, password: string):AppThunk => {
  return (dispatch: AppDispatch) => {
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

export const initiatePasswordReset = (email: string): AppThunk => {
  return (dispatch: AppDispatch) => {
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

export const finalizePasswordReset = (password: string, token: string):AppThunk => {
  return (dispatch: AppDispatch) => {
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

export const logout = (refreshToken: string): AppThunk => {
  return (dispatch: AppDispatch) => {
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

export const initializeAuth = ():AppThunk => {
  return (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch({type: SET_REFRESH_TOKEN, refreshToken});
  }
}