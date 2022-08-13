import styles from './order-info-page.module.css'
import {OrderInfo} from "../../components/order-info/order-info";

export function OrderInfoPage() {
  return (
    <div className={styles.orderPage}>
      <main>
        <OrderInfo />
      </main>
    </div>
  )
}