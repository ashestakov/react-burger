import reducer from './ingredients';
import * as types from "../actions/ingredients";

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ingredients: [],
      makingRequest: false,
      requestFailed: false
    });
  })

  it('should handle INGREDIENTS_REQUEST', () => {
    expect(reducer({
      ingredients: [],
      makingRequest: false,
      requestFailed: false
    }, {
      type: types.INGREDIENTS_REQUEST
    })).toEqual({
      ingredients: [],
      makingRequest: true,
      requestFailed: false
    });
  });

  it('should handle INGREDIENTS_SUCCESS', () => {
    expect(reducer({
      ingredients: [],
      makingRequest: true,
      requestFailed: false
    }, {
      type: types.INGREDIENTS_SUCCESS,
      ingredients: [{
        id: 1,
        name: 'test'
      }]
    })).toEqual({
      ingredients: [{
        id: 1,
        name: 'test'
      }],
      makingRequest: false,
      requestFailed: false
    })
  });

  it('should handle INGREDIENTS_ERROR', () => {
    expect(reducer({
      ingredients: [],
      makingRequest: true,
      requestFailed: false
    }, {
      type: types.INGREDIENTS_ERROR
    })).toEqual({
      ingredients: [],
      makingRequest: false,
      requestFailed: true
    })
  })
});