import {SET_MODAL_ORDER} from "../actions/modalOrder";

export default function modalOrder(state = null, action) {
  switch (action.type) {
    case SET_MODAL_ORDER:
      return action.payload;
    default:
      return state;
  }
}