import {AnyAction} from "redux";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export type WSConnectionAction = AnyAction & {
  type: typeof WS_CONNECTION_START | typeof WS_CONNECTION_CLOSE | typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_CLOSED | typeof WS_GET_MESSAGE | typeof WS_SEND_MESSAGE;
}