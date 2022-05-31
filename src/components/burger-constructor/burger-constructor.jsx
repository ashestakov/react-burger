import styles from './burger-constructor.module.css'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";

function BurgerConstructor({ingredients, onPlaceOrder}) {
  const burger = ingredients.slice(2, 8);
  const top = ingredients[0];
  const bottom = ingredients[0];
  const total = [top, ...burger, bottom].reduce((acc, cur) => acc + cur.price, 0);

  const onClickOrder = () => {
    onPlaceOrder({id: '034536'});
  }

  return (
    <section className="pl-4 pr-4 mt-25">
      <ul className={styles.ingredientStack + " mb-10"}>
        <li className={"pl-8"}>
          <ConstructorElement type="top" text={top.name + " (верх)"} price={top.price} thumbnail={top.image_mobile}
                              isLocked={true}/>
        </li>
        {
          <div className={styles.fillingsScrollContainer}>
            {
              burger.map(({name, price, image_mobile}, index) => {
                return (
                  <li className={"pl-8"} key={index}>
                    <DragIcon type={"primary"}/>
                    <ConstructorElement text={name} price={price} thumbnail={image_mobile} isLocked={false}/>
                  </li>
                )
              })
            }
          </div>
        }
        <li className={"pl-8"}>
          <ConstructorElement type="bottom" text={bottom.name + " (низ)"} price={bottom.price}
                              thumbnail={bottom.image_mobile} isLocked={true}/>
        </li>
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
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  onPlaceOrder: PropTypes.func.isRequired
}

export default BurgerConstructor;