import styles from "./order-details.module.css";
import {PlacedOrder} from "../../types/order";

function OrderDetails({order}: {order: PlacedOrder}) {
  return (
    <div className={styles.orderDetails}>
      <p className={styles.glow + " text text_type_digits-large mb-8"}>{order.number}</p>
      <p className={"mb-15 text text_type_main-medium"}>идентификатор заказа</p>
      <div className={styles.done + " mb-15"}>
      </div>
      <p className={"text text_type_main-default mb-2"}>
        Ваш заказ начали готовить
      </p>
      <p className={styles.pleaseWait + " text text_type_main-default mb-20"}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;