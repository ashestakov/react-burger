import {wsReducer as reducer} from './websocket';
import * as types from "../actions/websocket";

describe('websocket reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      wsConnected: false,
      orders: []
    });
  })

  it('should handle WS_CONNECTION_START', () => {
    expect(reducer({wsConnected: false, orders: []}, {
      type: types.WS_CONNECTION_START
    })).toEqual({
      wsConnected: false, orders: []
    })
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(reducer({wsConnected: false, orders: []}, {
      type: types.WS_CONNECTION_SUCCESS
    })).toEqual({
      wsConnected: true, orders: []
    })
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(reducer({wsConnected: false, orders: []}, {
      type: types.WS_CONNECTION_ERROR
    })).toEqual({
      wsConnected: false, orders: []
    })
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(reducer({wsConnected: true, orders: []}, {
      type: types.WS_CONNECTION_CLOSED
    })).toEqual({
      wsConnected: false, orders: []
    })
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(reducer({wsConnected: false, orders: []}, {
      type: types.WS_GET_MESSAGE,
      payload: `{
        "orders": [777, 999],
        "total": 1234,
        "totalToday": 890
      }`
    })).toEqual({
      wsConnected: false,
      orders: [777, 999],
      total: 1234,
      totalToday: 890
    })
  })
})
