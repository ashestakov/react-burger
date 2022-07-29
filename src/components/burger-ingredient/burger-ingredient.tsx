import styles from "../burger-ingredients/burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDrag} from 'react-dnd';
import {Ingredient} from "../../types/ingredient";

function BurgerIngredient(
  {ingredient, count, onClick}: { ingredient: Ingredient, count: number, onClick: (ingredient: Ingredient) => void }
) {
  const {_id, image, name, price} = ingredient;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {id: _id}
  })

  return (
    <li ref={dragRef} className={styles.ingredient} key={_id} onClick={() => onClick(ingredient)}>
      {count && (<div className={styles.counterContainer}>
        <Counter count={count} size="default"/>
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

export default BurgerIngredient;