import {RootState} from "./services/reducers/root-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {store} from "./store";
import type {} from 'redux-thunk/extend-redux'
import {AuthAction} from "./services/actions/auth";
import {IngredientAction} from "./services/actions/ingredients";
import {OrderAction} from "./services/actions/order";
import {PlacedOrderAction} from "./services/actions/placed-order";
import {WSConnectionAction} from "./services/actions/websocket";

type AppAction = AuthAction | IngredientAction | OrderAction | PlacedOrderAction | WSConnectionAction;

export type AppThunk = ThunkAction<void, RootState, unknown, AppAction>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector