import styles from './feed-page.module.css';
import {HistoryOrder} from "../../types/order";
import {OrderCard} from "../../components/order-card/order-card";
import {useAppDispatch, useAppSelector} from "../../hooks";
import React, {useCallback, useEffect} from "react";
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START,
} from "../../services/actions/websocket";
import orderStyles from '../../utils/order/order.module.css';
import {Link, Route, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import Modal from "../../components/modal/modal";
import {OrderInfo} from "../../components/order-info/order-info";
import {OrderInfoPage} from "../order-info-page/order-info-page";

function chunk(items: Array<any>, size: number) {
  const chunks = []
  items = [].concat(...items)

  while (items.length) {
    chunks.push(
      items.splice(0, size)
    )
  }

  return chunks
}

type LocationState = {
  background?: Location;
}

type ParamsType = {
  id: string
}

export function FeedPage() {
  const orders: HistoryOrder[] = useAppSelector(state => state.orderHistory.orders);
  const totalOrders: number = useAppSelector(state => state.orderHistory.total);
  const totalTodayOrders: number = useAppSelector(state => state.orderHistory.totalToday);
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();
  // при попытке типизировать background, сталкиваюсь с ошибкой TS "Location is not a generic",
  // хотя чуть выше Location как раз используется как дженерик
  // @ts-ignore
  const background = (location as Location).state?.background;
  const match = useRouteMatch<ParamsType>();
  const history = useHistory();
  const onModalClose = useCallback(() => {
    history.push('/feed');
  }, []);

  useEffect(
    () => {
      dispatch(
        {
          type: WS_CONNECTION_START,
          payload: 'wss://norma.nomoreparties.space/orders/all'
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
        <Route path={"/feed/:id"} render={() => {
          return (<Modal onClose={onModalClose} title={''}>
            <OrderInfo/>
          </Modal>)
        }}/>
      )}
      <div className={styles.feedPage}>
        <h1 className={"mt-10 mb-5 text_type_main-large"}>Лента заказов</h1>
        <main>
          <section className={styles.orderList}>
            {
              orders.map(order => (
                <Link to={{
                  pathname: `/feed/${order.number}`,
                  state: {background: location}
                }} key={order.number}>
                  <OrderCard order={order}/>
                </Link>)
              )
            }
          </section>
          <section className={styles.orderDetails}>
            <div className={styles.orderTableau}>
              <div>
                <p className={"text_type_main-medium mb-6"}>Готовы:</p>
                <div className={styles.orderColumnsContainer}>
                  {
                    chunk(orders.filter(order => order.status === 'done'), 10).map((chunk, index) => (
                      (<ul key={chunk[0].number}>
                          {chunk.slice(0, 10).map(order => {
                            return (
                              <li key={order.number} className={styles.readyOrder}>
                                <p className={orderStyles.doneOrder + " text_type_digits-medium"}>{order.number}</p>
                              </li>)
                          })
                          }
                        </ul>
                      )
                    ))
                  }
                </div>
              </div>
              <div>
                <p className={"text_type_main-medium mb-6"}>В работе:</p>
                <ul>
                  {orders.filter(o => o.status === 'pending').map(order => {
                    return (<li key={order.number}>
                      <p className={"text_type_digits-medium"}>{order.number}</p>
                    </li>)
                  })}
                </ul>
              </div>
            </div>
            <div>
              <p className={"text_type_main-medium"}>
                Выполнено за все время:
              </p>
              <p className={"text_type_digits-large"}>
                {totalOrders}
              </p>
            </div>
            <div>
              <p className={"text_type_main-medium"}>
                Выполнено за сегодня:
              </p>
              <p className={"text_type_digits-large"}>
                {totalTodayOrders}
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}