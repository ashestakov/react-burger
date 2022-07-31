import {OrderCard} from "../../components/order-card/order-card";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {HistoryOrder} from "../../types/order";
import {useEffect} from "react";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/actions/websocket";
import {Link, useLocation} from "react-router-dom";

export function OrderHistoryPage() {
  const orders: Array<HistoryOrder> = useAppSelector(store => store.orderHistory.orders);
  const accessToken = useAppSelector(store => store.auth.accessToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

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
  return (
    <>
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