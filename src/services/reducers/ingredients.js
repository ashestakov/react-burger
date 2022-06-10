import {SET_INGREDIENTS} from "../actions/ingredients";

const INITIAL_STATE = [];

export default function ingredients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_INGREDIENTS:
      return action.payload
    default:
      return state;
  }
}