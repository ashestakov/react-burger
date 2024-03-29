import styles from './burger-constructor.module.css'
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrop} from "react-dnd";
import {useCallback} from "react";
import DraggableConstructorElement from "../draggable-constructor-element/draggable-constructor-element";
import {useAppSelector} from "../../hooks";
import React from "react";
import {Order} from "../../types/order";

function BurgerConstructor(
  {onPlaceOrder, onAddIngredient, onRemoveIngredient}:
    {
      onPlaceOrder: (order: Order) => void,
      onAddIngredient: (id: string) => void,
      onRemoveIngredient: (index: number) => void
    }
) {
  const order = useAppSelector(store => store.order);
  const total = [order.bun, ...order.mainsAndSauces, order.bun].filter(item => item)
    .reduce((acc, cur) => acc + cur.price, 0);

  const onClickOrder = () => {
    onPlaceOrder(order);
  }

  const onDropHandler = useCallback(({id}: {id: string}) => {
    onAddIngredient(id);
  }, [])

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    drop(dragObject) {
      onDropHandler(dragObject as {id: string});
    },
  });

  return (
    <section className="pl-4 pr-4 mt-25">
      <ul ref={dropTargetRef} className={styles.ingredientStack + " mb-10"}>
        <li className={"pl-8"}>
          {order.bun ? (
              <ConstructorElement type="top" text={order.bun.name + " (верх)"} price={order.bun.price}
                                  thumbnail={order.bun.image_mobile}
                                  isLocked={true}
              />)
            : (<div className={styles.bunPlaceholder + ' ' + styles.bunPlaceholder_top}>
              Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
            </div>)
          }
        </li>
        {
          <div className={styles.fillingsScrollContainer}>
            {
              order.mainsAndSauces.map(({_id, name, price, image_mobile}, index) => {
                return (
                  <DraggableConstructorElement key={index} id={_id} index={index} name={name} price={price}
                                               thumbnail={image_mobile}
                                               handleClose={() => onRemoveIngredient(index)}
                  />
                )
              })
            }
          </div>
        }
        <li className={"pl-8"}>
          {order.bun ? (
            <ConstructorElement type="bottom" text={order.bun.name + " (низ)"} price={order.bun.price}
                                thumbnail={order.bun.image_mobile} isLocked={true}/>
          ) : (<div className={styles.bunPlaceholder + ' ' + styles.bunPlaceholder_bottom}>
            Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
          </div>)
          }
        </li>
      </ul>
      {
        order.bun &&
        (<div className={styles.total}>
            <span className={"text text_type_digits-medium mr-10"}>
                {total} <CurrencyIcon type={"primary"}/>
            </span>
          <Button type="primary" size="large" onClick={onClickOrder}>
            Оформить заказ
          </Button>
        </div>)
      }
    </section>
  )
}

export default BurgerConstructor;