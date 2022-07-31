import {RootState} from "./services/reducers/root-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<any, any, any>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector