import styles from './feed-page.module.css';
import {HistoryOrder} from "../../types/order";
import {OrderCard} from "../../components/order-card/order-card";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {WS_CONNECTION_START, WS_GET_MESSAGE} from "../../services/actions/websocket";
import orderStyles from '../../utils/order/order.module.css';
import {Link, useLocation} from "react-router-dom";

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

export function FeedPage() {
  const orders: HistoryOrder[] = useAppSelector(state => state.orderHistory.orders);
  const totalOrders: number = useAppSelector(state => state.orderHistory.total);
  const totalTodayOrders: number = useAppSelector(state => state.orderHistory.totalToday);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(
    () => {
      dispatch(
        {
          type: WS_CONNECTION_START,
          payload: 'wss://norma.nomoreparties.space/orders/all'
        }
      );
      setTimeout(() => {
        dispatch({type: WS_GET_MESSAGE});
      });
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );


  return (<div className={styles.feedPage}>
    <h1 className={"mt-10 mb-5 text_type_main-large"}>Лента заказов</h1>
    <main>
      <section className={styles.orderList}>
        {
          orders.map(order => (
            <Link to={{
              pathname: `/feed/${order.number}`,
              state: { background: location }
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
                  (<ul>
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
  </div>)
}