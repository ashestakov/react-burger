import styles from './burger-constructor.module.css'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import {useDrop} from "react-dnd";
import {useCallback} from "react";
import {useSelector} from "react-redux";

function BurgerConstructor({onPlaceOrder, onAddIngredient, onRemoveIngredient}) {
  const order = useSelector(store => store.order);
  const total = [order.bun, ...order.mainsAndSauces, order.bun].filter(item => item)
    .reduce((acc, cur) => acc + cur.price, 0);

  const onClickOrder = () => {
    onPlaceOrder(order);
  }

  const onDropHandler = useCallback(({id}) => {
    onAddIngredient(id);
  }, [])

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(id) {
      onDropHandler(id);
    },
  });

  return (
    <section className="pl-4 pr-4 mt-25">
      <ul ref={dropTarget} className={styles.ingredientStack + " mb-10"}>
        {order.bun && (
          <li className={"pl-8"}>
            <ConstructorElement type="top" text={order.bun.name + " (верх)"} price={order.bun.price}
                                thumbnail={order.bun.image_mobile}
                                isLocked={true}
            />
          </li>
        )}
        {
          <div className={styles.fillingsScrollContainer}>
            {
              order.mainsAndSauces.map(({name, price, image_mobile}, index) => {
                return (
                  <li className={"pl-8"} key={index}>
                    <DragIcon type={"primary"}/>
                    <ConstructorElement text={name} price={price} thumbnail={image_mobile} isLocked={false}
                                        handleClose={() => onRemoveIngredient(index)}
                    />
                  </li>
                )
              })
            }
          </div>
        }
        {order.bun && (
          <li className={"pl-8"}>
            <ConstructorElement type="bottom" text={order.bun.name + " (низ)"} price={order.bun.price}
                                thumbnail={order.bun.image_mobile} isLocked={true}/>
          </li>)}
      </ul>
      <div className={styles.total}>
            <span className={"text text_type_digits-medium mr-10"}>
                {total} <CurrencyIcon type={"primary"}/>
            </span>
        <Button type="primary" size="large" onClick={onClickOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  onPlaceOrder: PropTypes.func.isRequired,
  onRemoveIngredient: PropTypes.func.isRequired
}

export default BurgerConstructor;