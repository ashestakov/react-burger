import reducer from './order';
import * as types from "../actions/order";

describe('order reducer', () => {
  const initialState = {bun: null, mainsAndSauces: []};

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle ORDER_INGREDIENT_ADD', () => {
    expect(reducer(initialState, {
      type: types.ORDER_INGREDIENT_ADD,
      ingredient: {
        id: 1,
        name: 'the sauce',
        type: 'sauce'
      }
    })).toEqual({
      ...initialState,
      mainsAndSauces: [{id: 1, name: 'the sauce', type: 'sauce'}]
    })

    expect(reducer(initialState, {
      type: types.ORDER_INGREDIENT_ADD,
      ingredient: {
        id: 1,
        name: 'the bun',
        type: 'bun'
      }
    })).toEqual({
      ...initialState,
      bun: {
        id: 1,
        name: 'the bun',
        type: 'bun'
      }
    })

    expect(reducer(initialState, {
      type: types.ORDER_INGREDIENT_ADD,
      ingredient: {
        id: 1,
        name: 'the main',
        type: 'main'
      }
    })).toEqual({
      ...initialState,
      mainsAndSauces: [{
        id: 1,
        name: 'the main',
        type: 'main'
      }]
    })
  })

  it('should handle ORDER_INGREDIENT_REMOVE', () => {
    expect(reducer({
      bun: {
        id: 0,
        name: 'the bun',
        type: 'bun'
      }, mainsAndSauces: [{
        id: 1,
        name: 'the main',
        type: 'main'
      }, {
        id: 2,
        name: 'the sauce',
        type: 'sauce'
      }]
    }, {
      type: types.ORDER_INGREDIENT_REMOVE,
      index: 1
    })).toEqual({
      bun: {
        id: 0,
        name: 'the bun',
        type: 'bun'
      }, mainsAndSauces: [{
        id: 1,
        name: 'the main',
        type: 'main'
      }]
    })
  })

  it('should handle ORDER_RESET', () => {
    expect(reducer({
      bun: {
        id: 0,
        name: 'the bun',
        type: 'bun'
      }, mainsAndSauces: [{
        id: 1,
        name: 'the main',
        type: 'main'
      }, {
        id: 2,
        name: 'the sauce',
        type: 'sauce'
      }]
    }, {
      type: types.ORDER_RESET
    })).toEqual({bun: null, mainsAndSauces: []})
  })

  it('should handle ORDER_MOVE_INGREDIENT', () => {
    expect(reducer({
      bun: {
        id: 0,
        name: 'the bun',
        type: 'bun'
      }, mainsAndSauces: [{
        id: 1,
        name: 'the main',
        type: 'main'
      }, {
        id: 2,
        name: 'the sauce',
        type: 'sauce'
      }]
    }, {
      type: types.ORDER_MOVE_INGREDIENT,
      oldIndex: 0,
      newIndex: 1
    })).toEqual({
      bun: {
        id: 0,
        name: 'the bun',
        type: 'bun'
      }, mainsAndSauces: [{
        id: 2,
        name: 'the sauce',
        type: 'sauce'
      },
        {
          id: 1,
          name: 'the main',
          type: 'main'
        }
      ]
    })
  })
});