import styles from "./order-card.module.css";
import {dateAsHumanReadable} from "../../utils/date";
import {OrderIngredient} from "../order-ingredient/order-ingredient";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {HistoryOrder} from "../../types/order";
import {getOrderStatusClass, translateOrderStatus} from "../../utils/order/order";
import {useAppSelector} from "../../hooks";
import {Ingredient} from "../../types/ingredient";

function getIngredientById(id: string, ingredients: Array<Ingredient>): Ingredient {
  return ingredients.find(ing => ing._id === id) as Ingredient;
}

export function OrderCard({order, showStatus}: { order: HistoryOrder, showStatus?: boolean }) {
  const ingredients = useAppSelector(state => state.ingredients.ingredients);
  const uniqueIngredientsInOrder = Array.from(new Set(order.ingredients));

  return (
    <div key={order.number} className={styles.orderListItem + " mb-4"}>
      <div className={styles.orderListItemHeader}>
        <p className={"text_type_digits-default"}>#{order.number}</p>
        <p
          className={styles.orderCreatedAt + " text_type_main-default"}>{dateAsHumanReadable(order.createdAt)}
        </p>
      </div>
      <p className={"text_type_main-medium"}>{order.name}</p>
      {showStatus && (<p className={"text_type_main-default " + getOrderStatusClass(order.status)}>
        {translateOrderStatus(order.status)}
      </p>)}
      <div className={styles.feedOrderIngredientsContainer}>
        <ul className={styles.feedOrderIngredients}>
          {
            uniqueIngredientsInOrder.length > 5 ?
              <OrderIngredient plusQuantity={uniqueIngredientsInOrder.length - 5} imageUrl={getIngredientById(uniqueIngredientsInOrder[5], ingredients).image_mobile} key={5}/>
              :
              null
          }
          {
            uniqueIngredientsInOrder.slice(0, 5).reverse().map((ingredientId, index) => {
              const ingredient = getIngredientById(ingredientId, ingredients);
              if (!ingredient) {
                return null;
              }
              return (
                <OrderIngredient imageUrl={ingredient.image_mobile} key={index}/>
              )
            })
          }
        </ul>
        <div className={styles.orderListPrice}>
                  <span className={"text text_type_digits-default"}>
                    {
                      order.ingredients.reduce((acc, ingredientId) => {
                        const ingredient = ingredients.find(ing => ing._id === ingredientId);
                        if (!ingredient) {
                          return acc;
                        }
                        return acc + ingredient.price
                      }, 0)
                    }
                  </span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}