import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from '../ingredient-details/ingredient-details';
import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE} from "../../services/actions/order";
import {MODAL_INGREDIENT_SET, MODAL_INGREDIENT_RESET} from "../../services/actions/modalIngredient";
import {getIngredients, placeOrder} from "../../services/actions";
import {PLACED_ORDER_RESET} from "../../services/actions/placedOrder";

function App() {
  const ingredients = useSelector(store => store.ingredients);
  const modalIngredient = useSelector(store => store.modalIngredient);
  const placedOrder = useSelector(store => store.placedOrder);
  const dispatch = useDispatch();

  const addIngredient = useCallback((ingredient) => {
    dispatch({type: ORDER_INGREDIENT_ADD, ingredient});
  }, []);

  const removeIngredient = useCallback((index) => {
    dispatch({type: ORDER_INGREDIENT_REMOVE, payload: index});
  }, []);

  const setModalIngredient = useCallback((ingredient) => {
    dispatch({type: MODAL_INGREDIENT_SET, payload: ingredient});
  }, []);

  const resetModalIngredient = useCallback(() => {
    dispatch({type: MODAL_INGREDIENT_RESET});
  }, []);

  const resetPlacedOrder = useCallback(() => {
    dispatch({type: PLACED_ORDER_RESET});
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const onPlaceOrder = useCallback((order) => {
    dispatch(placeOrder(order));
  }, []);

  const onIngredientInfo = useCallback((ingredient) => {
    setModalIngredient(ingredient);
  }, []);

  const onModalClose = useCallback(() => {
    resetPlacedOrder();
    resetModalIngredient();
  }, []);

  return (
    <>
      {(placedOrder && <OrderDetails order={placedOrder} onClose={onModalClose}/>)}
      {(modalIngredient && <IngredientDetails ingredient={modalIngredient} onClose={onModalClose}/>)}
      <div className={styles.pageConstructor}>
        <AppHeader/>
        <main>
          {
            ingredients.length > 0 && (
              <>
                <BurgerIngredients onIngredientInfo={onIngredientInfo} onClickIngredient={addIngredient}/>
                <BurgerConstructor onPlaceOrder={onPlaceOrder} onRemoveIngredient={removeIngredient}/>
              </>
            )
          }
        </main>
      </div>
    </>
  );
}

export default App;
