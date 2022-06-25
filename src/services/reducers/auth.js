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
} from "../actions/auth";

const INITIAL_STATE = {
  requestInProgress: false,
  requestError: null,
  accessToken: null,
  refreshToken: null,
  auth: null
}

export function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user
      }
    case LOGIN_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user
      }
    case REGISTER_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case INITIATE_PASSWORD_RESET_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case INITIATE_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        requestInProgress: false
      }
    case INITIATE_PASSWORD_RESET_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case FINALIZE_PASSWORD_RESET_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case FINALIZE_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        requestInProgress: false
      }
    case FINALIZE_PASSWORD_RESET_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        accessToken: null,
        refreshToken: null,
        user: null
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case GET_ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      }
    case GET_ACCESS_TOKEN_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case LOAD_USER_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        user: action.user
      }
    case LOAD_USER_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case PATCH_USER_REQUEST:
      return {
        ...state,
        requestInProgress: true
      }
    case PATCH_USER_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        user: action.user
      }
    case PATCH_USER_ERROR:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken
      }
    default:
      return state;
  }
}