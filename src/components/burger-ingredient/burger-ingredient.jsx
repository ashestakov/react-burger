import styles from "../burger-ingredients/burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDrag} from 'react-dnd';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";

function BurgerIngredient({ingredient, count, onClick}) {
  const {_id, image, name, price} = ingredient;

  const [{isDragging}, dragRef] = useDrag({
    type: 'ingredient',
    item: {id: _id},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
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

BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func.isRequired
}

export default BurgerIngredient;