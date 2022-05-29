import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import React from "react";
import PropTypes from "prop-types";

const TABS = [
  {type: 'bun', name: 'Булки'},
  {type: 'sauce', name: 'Соусы'},
  {type: 'main', name: 'Начинки'}
]

function BurgerIngredients({ingredients, onIngredientInfo}) {
  const [current, setCurrent] = React.useState('one')

  const lists = TABS.map(({type, name}) => {
    return {
      type,
      name,
      ingredients: ingredients.filter((i) => i.type === type)
    }
  })

  return (<section className="pt-10">
    <h1 className={"text text_type_main-large mb-5"}>
      Соберите бургер
    </h1>
    <div style={{display: 'flex'}} className={"mb-10"}>
      {
        TABS.map(({type, name}) => {
          return (
            <Tab key={type} value={type} active={current === type} onClick={setCurrent}>
              {name}
            </Tab>
          )
        })
      }
    </div>
    <div className={styles.ingredientsScrollContainer}>
      <ul className={styles.ingredients}>
        {
          lists.map(({name, type, ingredients}) => {
            return (
              <li key={type}>
                <h2 className={"text_type_main-medium"}>
                  {name}
                </h2>
                <ul className={"pl-4 pr-4 pb-10 " + styles.ingredientList}>
                  {
                    ingredients.map((ingredient, index) => {
                        const {image, price, name, _id} = ingredient;
                        return (
                          <li className={styles.ingredient} key={_id} onClick={() => onIngredientInfo(ingredient)}>
                            {index === 0 && (<div className={styles.counterContainer}>
                              <Counter count={1} size="default"/>
                            </div>)}
                            <img className={"ml-4 mr-4"} src={image} alt={name}/>
                            <p className={"text text_type_digits-default mt-1 mb-1 " + styles.price}>
                              {price}
                              <CurrencyIcon type="primary"/>
                            </p>
                            <p className={"text_type_main-default " + styles.name}>
                              {name}
                            </p>
                          </li>
                        )
                      }
                    )
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </div>
  </section>)
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string,
        price: PropTypes.number,
        type: PropTypes.string
      }
    )
  ).isRequired,
  onIngredientInfo: PropTypes.func.isRequired
}

export default BurgerIngredients;