import {auth as reducer} from './auth';
import * as types from "../actions/auth";

describe('auth reducer', () => {
  const initialState = {
    requestInProgress: false,
    passwordResetRequestSuccess: false,
    requestError: null,
    accessToken: null,
    refreshToken: null,
    user: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_REQUEST
      })
    ).toEqual(
      {
        ...initialState,
        requestInProgress: true,
      }
    )
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_SUCCESS,
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        }
      })
    ).toEqual(
      {
        ...initialState,
        requestInProgress: false,
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        }
      }
    )
  })

  it('should handle LOGIN_ERROR', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true
      }, {
        type: types.LOGIN_ERROR,
        error: 'Invalid credentials'
      })
    ).toEqual(
      {
        ...initialState,
        requestInProgress: false,
        requestError: 'Invalid credentials',
      }
    )
  })

  it('should handle LOGOUT_REQUEST', () => {
    expect(
      reducer({
          ...initialState,
          accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
          refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
          user: {
            email: 'norma@stellar-burgers.com',
            name: 'Norma',
          }
        },
        {
          type: types.LOGOUT_REQUEST
        }
      )
    ).toEqual(
      {
        ...initialState,
        requestInProgress: true,
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        }
      }
    )
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer({
          ...initialState,
          accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
          refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
          user: {
            email: 'norma@stellar-burgers.com',
            name: 'Norma',
          }
        },
        {
          type: types.LOGOUT_SUCCESS
        })).toEqual(initialState)
  })

  it('should handle LOGOUT_ERROR', () => {
    expect(
      reducer({
          ...initialState,
          accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
          refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
          user: {
            email: 'norma@stellar-burgers.com',
            name: 'Norma',
          }
        },
        {
          type: types.LOGOUT_ERROR,
          error: 'Something went wrong'
        })).toEqual(
      {
        ...initialState,
        requestInProgress: false,
        requestError: 'Something went wrong',
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        },
      }
    )
  })

  it('should handle REGISTER_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.REGISTER_REQUEST
      })
    ).toEqual(
      {
        ...initialState,
        requestInProgress: true,
      }
    )
  })

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true
      }, {
        type: types.REGISTER_SUCCESS,
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        },
      })).toEqual(
      {
        ...initialState,
        requestInProgress: false,
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        },
      })
  })

  it('should handle REGISTER_ERROR', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true
      }, {
        type: types.REGISTER_ERROR,
        error: 'Invalid credentials'
      })).toEqual(
      {
        ...initialState,
        requestError: 'Invalid credentials',
      }
    )
  })

  it('should handle INITIATE_PASSWORD_RESET_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.INITIATE_PASSWORD_RESET_REQUEST
      })).toEqual(
      {
        ...initialState,
        requestInProgress: true,
      }
    )
  })

  it('should handle INITIATE_PASSWORD_RESET_SUCCESS', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.INITIATE_PASSWORD_RESET_SUCCESS
      })).toEqual(
      {
        ...initialState,
        passwordResetRequestSuccess: true,
      }
    )
  })

  it('should handle INITIATE_PASSWORD_RESET_ERROR', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.INITIATE_PASSWORD_RESET_ERROR,
        error: 'Invalid credentials'
      })).toEqual(
      {
        ...initialState,
        requestError: 'Invalid credentials',
      }
    )
  })

  it('should handle FINALIZE_PASSWORD_RESET_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.FINALIZE_PASSWORD_RESET_REQUEST
      })).toEqual(
      {
        ...initialState,
        requestInProgress: true,
      }
    )
  })

  it('should handle FINALIZE_PASSWORD_RESET_SUCCESS', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.FINALIZE_PASSWORD_RESET_SUCCESS
      })).toEqual(initialState)
  })

  it('should handle FINALIZE_PASSWORD_RESET_ERROR', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.FINALIZE_PASSWORD_RESET_ERROR,
        error: 'Invalid credentials'
      })).toEqual(
      {
        ...initialState,
        requestError: 'Invalid credentials',
      }
    )
  })

  it('should handle GET_ACCESS_TOKEN_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.GET_ACCESS_TOKEN_REQUEST
      })).toEqual(
      {
        ...initialState,
        requestInProgress: true,
      }
    )
  })

  it('should handle GET_ACCESS_TOKEN_SUCCESS', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.GET_ACCESS_TOKEN_SUCCESS,
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
      })).toEqual(
      {
        ...initialState,
        accessToken: '09ba8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
      })
  })

  it('should handle GET_ACCESS_TOKEN_ERROR', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.GET_ACCESS_TOKEN_ERROR,
        error: 'Invalid credentials'
      })).toEqual(
      {
        ...initialState,
        requestError: 'Invalid credentials',
      }
    )
  })

  it('should handle LOAD_USER_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.LOAD_USER_REQUEST
      })).toEqual(
      {
        ...initialState,
        requestInProgress: true,
      }
    )
  })

  it('should handle LOAD_USER_SUCCESS', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.LOAD_USER_SUCCESS,
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        },
      })).toEqual(
      {
        ...initialState,
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        },
      })
  })

  it('should handle LOAD_USER_ERROR', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.LOAD_USER_ERROR,
        error: 'Invalid credentials'
      })).toEqual(
      {
        ...initialState,
        requestError: 'Invalid credentials',
      }
    )
  })

  it('should handle PATCH_USER_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.PATCH_USER_REQUEST
      })).toEqual(
      {
        ...initialState,
        requestInProgress: true,
      }
    )
  })

  it('should handle PATCH_USER_SUCCESS', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
        user: {
          email: 'norma@stellar-burgers.com',
          name: 'Norma',
        },
      }, {
        type: types.PATCH_USER_SUCCESS,
        user: {
          email: 'uncle@stellar-burgers.com',
          name: 'Uncle',
        },
      })).toEqual(
      {
        ...initialState,
        user: {
          email: 'uncle@stellar-burgers.com',
          name: 'Uncle',
        },
      }
    )
  })

  it('should handle PATCH_USER_ERROR', () => {
    expect(
      reducer({
        ...initialState,
        requestInProgress: true,
      }, {
        type: types.PATCH_USER_ERROR,
        error: 'Invalid credentials'
      })).toEqual(
      {
        ...initialState,
        requestError: 'Invalid credentials',
      }
    )
  })

  it('should handle SET_REFRESH_TOKEN', () => {
    expect(
      reducer(initialState, {
        type: types.SET_REFRESH_TOKEN,
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
      })).toEqual(
      {
        ...initialState,
        refreshToken: '736ba90d-f8b8-4f6b-b8a4-e0b9b9f8d8f9',
      }
    )
  })
})