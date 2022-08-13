import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../actions/websocket';
import {HistoryOrder} from "../../types/order";

export type WSAction = {
  type: typeof WS_CONNECTION_START | typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_CLOSED | typeof WS_GET_MESSAGE | typeof WS_SEND_MESSAGE;
  payload: any;
}

type TWSState = {
  wsConnected: boolean;
  orders: HistoryOrder[];
  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  orders: []
};

export const wsReducer = (state = initialState, action: WSAction) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: false,
        orders: []
      }
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      let info;
      try {
        info = JSON.parse(action.payload);
      } catch (error) {
        return state;
      }
      const {orders, total, totalToday} = info;
      return {
        ...state,
        error: undefined,
        orders,
        total,
        totalToday
      };
    default:
      return state;
  }
};