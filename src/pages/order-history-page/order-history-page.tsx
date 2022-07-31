import {OrderCard} from "../../components/order-card/order-card";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {HistoryOrder} from "../../types/order";
import React, {useCallback, useEffect} from "react";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/actions/websocket";
import {Link, Route, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {OrderInfoPage} from "../order-info-page/order-info-page";
import Modal from "../../components/modal/modal";
import {OrderInfo} from "../../components/order-info/order-info";

type ParamsType = {
  id: string
}

export function OrderHistoryPage() {
  const orders: Array<HistoryOrder> = useAppSelector(store => store.orderHistory.orders);
  const accessToken = useAppSelector(store => store.auth.accessToken);
  const dispatch = useAppDispatch();
  const location = useLocation();
  // при попытке типизировать background, сталкиваюсь с ошибкой TS "Location is not a generic",
  // хотя чуть выше Location как раз используется как дженерик
  // @ts-ignore
  const background = (location as Location).state?.background;
  const match = useRouteMatch<ParamsType>();

  const history = useHistory();

  const onModalClose = useCallback(() => {
    history.push('/profile/orders');
  }, []);

  useEffect(
    () => {
      dispatch(
        {
          type: WS_CONNECTION_START,
          payload: `wss://norma.nomoreparties.space/orders?token=${accessToken.replace('Bearer ', '')}`
        }
      );

      return () => {
        dispatch({type: WS_CONNECTION_CLOSE});
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (!background && match.params.id) {
    return (
      <OrderInfoPage />
    )
  }

  return (
    <>
      {background && (
        <Route path={"/profile/orders/:id"} render={() => {
          return (<Modal onClose={onModalClose} title={''}>
            <OrderInfo/>
          </Modal>)
        }}/>
      )}
      {
        orders.length > 0 ?
          orders.map(order => (
            <Link
              to={{pathname: `/profile/orders/${order.number}`, state: {background: location}}}
              key={order.number}
            >
              <OrderCard showStatus={true} order={order}/>
            </Link>
          ))
          :
          <p className={"text_type_main-default"}>Пока заказов не было</p>
      }
    </>
  )
}