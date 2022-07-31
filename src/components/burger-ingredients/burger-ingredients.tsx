import styles from './burger-ingredients.module.css'
import React, {Ref, SyntheticEvent, useRef} from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks";
import {Ingredient, IngredientType} from "../../types/ingredient";

const TABS: Array<{ type: IngredientType, name: string }> = [
  {type: 'bun', name: 'Булки'},
  {type: 'sauce', name: 'Соусы'},
  {type: 'main', name: 'Начинки'}
]

function BurgerIngredients({onIngredientInfo}: { onIngredientInfo: (ingredient: Ingredient) => void }) {
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const [current, setCurrent] = React.useState('bun');
  const order = useAppSelector(store => store.order);

  const ingredientCounts = React.useMemo(() => {
    const counts: { [id: string]: number } = {};
    [order.bun, order.bun, ...order.mainsAndSauces].forEach(ingredient => {
      if (!ingredient) {
        return;
      }
      counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    });
    return counts;
  }, [order]);

  const refs: Array<React.MutableRefObject<any>> = [useRef(), useRef(), useRef()];

  const lists = TABS.map(({type, name}, index) => {
    return {
      type,
      name,
      ingredients: ingredients.filter((i) => i.type === type),
      ref: refs[index]
    }
  })

  const onScroll = (e: SyntheticEvent) => {
    const nearestTabIndex = [0, 1, 2].map((index) => {
      const target = e.target as HTMLElement;
      const ref = refs[index]!;
      return {
        index,
        distance: Math.abs(
          target.getBoundingClientRect().top -
          ref.current.getBoundingClientRect().top
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
                        const _id = ingredient._id;
                        return (
                          <BurgerIngredient count={ingredientCounts[_id]} ingredient={ingredient}
                                            onClick={onIngredientInfo} key={index}/>
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

export default BurgerIngredients;