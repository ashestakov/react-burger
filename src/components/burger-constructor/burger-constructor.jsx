import styles from './burger-constructor.module.css'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data'

export default function BurgerConstructor() {
  const burger = data.slice(2, 8);
  const top = data[0];
  const bottom = data[0];
  const total = 610;

  return <section className="pl-4 pr-4 mt-25">
    <ul className={styles.ingredientStack + " mb-10"}>
      <li className={"pl-8"}>
        <ConstructorElement type="top" text={top.name + " (верх)"} price={top.price} thumbnail={top.image_mobile}
                            isLocked={true}/>
      </li>
      {
        <div className={styles.fillingsScrollContainer}>
          {
            burger.map(({name, price, image_mobile}) => {
              return (
                <li className={"pl-8"}>
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
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  </section>
}