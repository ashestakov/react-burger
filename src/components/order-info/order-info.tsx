import styles from "./order-info.module.css";
import {OrderIngredient} from "../order-ingredient/order-ingredient";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {dateAsHumanReadable} from "../../utils/date";
import {HistoryOrder} from "../../types/order";
import {getOrderStatusClass, translateOrderStatus} from "../../utils/order/order";
import {useAppSelector} from "../../hooks";
import {useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {DOMAIN} from "../../utils/domain";

type ParamsType = {
  id: string
}

export function OrderInfo() {
  const ingredients = useAppSelector(state => state.ingredients.ingredients);
  const match = useRouteMatch<ParamsType>();
  const [order, setOrder] = useState<HistoryOrder | undefined>(undefined);

  useEffect(() => {
    if (!ingredients) {
      return
    }
    fetch(`${DOMAIN}/api/orders/${match.params.id}`)
      .then(response => response.json()).then((response) => {
      setOrder(response.orders[0]);
    });
  }, [ingredients, match]);

  if (!(order && ingredients?.length)) {
    return null;
  }

  return (
    <div className={styles.orderInfo}>
      <p className={"text text_type_digits-default mb-10 " + styles.orderNumber}>#{order.number}</p>
      <p className={"text_type_main-medium mb-3"}>{order.name}</p>
      <p className={"text_type_main-default mb-15 " + getOrderStatusClass(order.status)}>
        {translateOrderStatus(order.status)}
      </p>
      <p className={"text_type_main-medium mb-6"}>Состав:</p>
      <div className={styles.orderIngredients + " pr-6 mb-10"}>
        <ul>
          {Array.from(new Set(order.ingredients)).map(ingredientId => {
            const ingredient = ingredients.find(ing => ing._id === ingredientId)!;
            const quantity = order.ingredients.filter(id => id === ingredientId).length;
            return (
              <li key={ingredient._id} className={"mb-4 " + styles.orderIngredientRow}>
                <OrderIngredient imageUrl={ingredient.image_mobile}/>
                <p className={styles.orderIngredientName + " ml-4 mr-4 text_type_main-default"}>{ingredient.name}</p>
                <p className={"text_type_digits-default mr-2"}>{quantity} x {ingredient.price}</p>
                <CurrencyIcon type={"primary"}/>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.orderTotalContainer}>
        <p className={"text_type_main-default " + styles.orderCreatedAt}>
          {dateAsHumanReadable(order.createdAt)}
        </p>
        <p className={"text_type_digits-default mr-2"}>
          {
            order.ingredients.reduce((acc, ingredientId) => {
              return acc + ingredients.find(ing => ing._id === ingredientId)!.price;
            }, 0)
          }</p>
        <CurrencyIcon type={"primary"}/>
      </div>
    </div>
  )
}