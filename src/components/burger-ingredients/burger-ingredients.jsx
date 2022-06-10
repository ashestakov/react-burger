import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import React, {useRef} from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const TABS = [
  {type: 'bun', name: 'Булки'},
  {type: 'sauce', name: 'Соусы'},
  {type: 'main', name: 'Начинки'}
]

function BurgerIngredients({onIngredientInfo, onClickIngredient}) {
  const ingredients = useSelector(store => store.ingredients);
  const [current, setCurrent] = React.useState('bun');
  const order = useSelector(store => store.order);

  const ingredientCounts = React.useMemo(() => {
    const counts = {};
    [order.bun, order.bun, ...order.mainsAndSauces].forEach(ingredient => {
      counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    });
    return counts;
  }, [order]);

  const onClick = React.useCallback((ingredient) => {
    onClickIngredient(ingredient);
    onIngredientInfo(ingredient);
  }, []);

  const refs = [useRef(), useRef(), useRef()];

  const lists = TABS.map(({type, name}, index) => {
    return {
      type,
      name,
      ingredients: ingredients.filter((i) => i.type === type),
      ref: refs[index]
    }
  })

  const onScroll = (e) => {
    const nearestTabIndex = [0, 1, 2].map((index) => {
      return {
        index,
        distance: Math.abs(
          e.target.getBoundingClientRect().top -
          refs[index].current.getBoundingClientRect().top
        )
      };
    }).reduce((prev, current) => {
      return prev.distance < current.distance ? prev : current;
    }).index;
    setCurrent(TABS[nearestTabIndex].type)
  }

  return (<section className="pt-10">
    <h1 className={"text text_type_main-large mb-5"}>
      Соберите бургер
    </h1>
    <div className={styles.tabContainer + " mb-10"}>
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
    <div className={styles.ingredientsScrollContainer} onScroll={onScroll}>
      <ul className={styles.ingredients}>
        {
          lists.map(({name, type, ingredients, ref}) => {
            return (
              <li key={type}>
                <h2 className={"text_type_main-medium"} ref={ref}>
                  {name}
                </h2>
                <ul className={"pl-4 pr-4 pb-10 " + styles.ingredientList}>
                  {
                    ingredients.map((ingredient, index) => {
                        const {image, price, name, _id} = ingredient;
                        return (
                          <li className={styles.ingredient} key={_id} onClick={() => onClick(ingredient)}>
                            {ingredientCounts[_id] && (<div className={styles.counterContainer}>
                              <Counter count={ingredientCounts[_id]} size="default"/>
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
  onIngredientInfo: PropTypes.func.isRequired
}

export default BurgerIngredients;