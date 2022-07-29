import type { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch} from "../hooks";
import {RootState} from "../services/reducers/root-reducer";
import {WSAction} from "../services/reducers/websocket";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: WSAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === 'WS_CONNECTION_START') {
        if (socket) {
          socket.close();
        }
        socket = new WebSocket(action.payload);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: 'WS_GET_MESSAGE', payload: data });
        };
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};