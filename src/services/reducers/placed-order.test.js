import reducer from './placed-order';
import * as types from "../actions/placed-order";

describe('placed order reducer', () => {
  const initialState = {
    order: null,
    makingRequest: false,
    requestFailed: false
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle PLACED_ORDER_SUCCESS', () => {
    expect(reducer(initialState, {
      type: types.PLACED_ORDER_SUCCESS,
      order: {
        id: 1,
        name: 'the order',
        ingredients: [{
          id: 1,
          name: 'the sauce',
          type: 'sauce'
        }]
      }
    })).toEqual({
      ...initialState,
      order: {
        id: 1,
        name: 'the order',
        ingredients: [{
          id: 1,
          name: 'the sauce',
          type: 'sauce'
        }]
      }
    })
  })

  it('should handle PLACED_ORDER_RESET', () => {
    expect(reducer({
      ...initialState,
      order: 1
    }, {
      type: types.PLACED_ORDER_RESET
    })).toEqual(initialState)
  })

  it('should handle PLACED_ORDER_ERROR', () => {
    expect(reducer(initialState, {
      type: types.PLACED_ORDER_ERROR
    })).toEqual({
      ...initialState,
      requestFailed: true
    })
  })
})