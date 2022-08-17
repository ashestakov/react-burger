import reducer from './ingredients';
import * as types from "../actions/ingredients";

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    makingRequest: false,
    requestFailed: false
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle INGREDIENTS_REQUEST', () => {
    expect(reducer(initialState, {
      type: types.INGREDIENTS_REQUEST
    })).toEqual({
      ...initialState,
      makingRequest: true,
    });
  });

  it('should handle INGREDIENTS_SUCCESS', () => {
    expect(reducer({
      ...initialState,
      makingRequest: true,
    }, {
      type: types.INGREDIENTS_SUCCESS,
      ingredients: [{
        id: 1,
        name: 'test'
      }]
    })).toEqual({
      ...initialState,
      ingredients: [{
        id: 1,
        name: 'test'
      }],
    })
  });

  it('should handle INGREDIENTS_ERROR', () => {
    expect(reducer({
      ...initialState,
      makingRequest: true,
    }, {
      type: types.INGREDIENTS_ERROR
    })).toEqual({
      ...initialState,
      requestFailed: true
    })
  })
});