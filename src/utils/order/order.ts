import styles from "./order.module.css";
import {OrderStatus} from "../../types/order";

const ORDER_STATUS_CLASSES = {
  "cancelled": styles.cancelledOrder,
  "pending": styles.inProgressOrder,
  "done": styles.doneOrder
}

const ORDER_STATUS_TRANSLATIONS = {
  "cancelled": 'Отменен',
  "pending": 'Готовится',
  "done": 'Выполнен'
}

export const getOrderStatusClass = (status: OrderStatus) => {
  return ORDER_STATUS_CLASSES[status];
}

export const translateOrderStatus = (status: OrderStatus) => {
  return ORDER_STATUS_TRANSLATIONS[status];
}