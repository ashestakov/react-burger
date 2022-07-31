import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch} from "../hooks";
import {RootState} from "../services/reducers/root-reducer";

type WSActions = {
  wsInit: string;
  wsSendMessage: string;
  wsClose: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string
}

export const socketMiddleware = (wsActions: WSActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: {type: typeof wsActions[keyof typeof wsActions], payload: any}) => {
      const {dispatch, getState} = store;
      const {type, payload} = action;
      const {wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage} = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        socket.onmessage = event => {
          const {data} = event;
          dispatch({type: onMessage, payload: data});
        };
        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(payload));
        }

        if (type === wsClose) {
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};