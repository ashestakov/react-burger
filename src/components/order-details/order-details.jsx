import Modal from "../modal/modal";
import styles from "./order-details.module.css";
import PropTypes from "prop-types";

function OrderDetails({order, onClose}) {
  return (
    <Modal title={""} onClose={onClose}>
      <div className={styles.orderDetails + " pt-4 pl-4 pr-4"}>
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
    </Modal>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.shape({number: PropTypes.number}).isRequired,
  onClose: PropTypes.func.isRequired
}

export default OrderDetails;