import {wsReducer as reducer} from './websocket';
import * as types from "../actions/websocket";

describe('websocket reducer', () => {
  const initialState = {
    wsConnected: false,
    orders: []
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle WS_CONNECTION_START', () => {
    expect(reducer(initialState, {
      type: types.WS_CONNECTION_START
    })).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(reducer(initialState, {
      type: types.WS_CONNECTION_SUCCESS
    })).toEqual({
      ...initialState,
      wsConnected: true
    })
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(reducer({wsConnected: false, orders: []}, {
      type: types.WS_CONNECTION_ERROR,
      payload: 'Error'
    })).toEqual({
      ...initialState,
      error: 'Error'
    })
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(reducer({...initialState, wsConnected: true}, {
      type: types.WS_CONNECTION_CLOSED
    })).toEqual(initialState)
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(reducer(initialState, {
      type: types.WS_GET_MESSAGE,
      payload: `{
        "orders": [777, 999],
        "total": 1234,
        "totalToday": 890
      }`
    })).toEqual({
      ...initialState,
      orders: [777, 999],
      total: 1234,
      totalToday: 890
    })
  })
})
