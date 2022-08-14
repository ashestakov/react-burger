import reducer from './placed-order';
import * as types from "../actions/placed-order";

describe('placed order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      order: null,
      makingRequest: false,
      requestFailed: false
    });
  })

  it('should handle PLACED_ORDER_SUCCESS', () => {
    expect(reducer({order: null, makingRequest: false, requestFailed: false}, {
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
      order: {
        id: 1,
        name: 'the order',
        ingredients: [{
          id: 1,
          name: 'the sauce',
          type: 'sauce'
        }]
      }, makingRequest: false, requestFailed: false
    })
  })

  it('should handle PLACED_ORDER_RESET', () => {
    expect(reducer({order: null, makingRequest: false, requestFailed: false}, {
      type: types.PLACED_ORDER_RESET
    })).toEqual({
      order: null, makingRequest: false, requestFailed: false
    })
  })

  it('should handle PLACED_ORDER_ERROR', () => {
    expect(reducer({order: null, makingRequest: false, requestFailed: false}, {
      type: types.PLACED_ORDER_ERROR
    })).toEqual({
      order: null, makingRequest: false, requestFailed: true
    })
  })
})