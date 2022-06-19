import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from '../ingredient-details/ingredient-details';
import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE} from "../../services/actions/order";
import {MODAL_INGREDIENT_SET, MODAL_INGREDIENT_RESET} from "../../services/actions/modal-ingredient";
import {getIngredients, placeOrder} from "../../services/actions";
import {PLACED_ORDER_RESET} from "../../services/actions/placed-order";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function App() {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const modalIngredient = useSelector(store => store.modalIngredient);
  const placedOrder = useSelector(store => store.placedOrder.order);
  const dispatch = useDispatch();

  const addIngredient = useCallback((id) => {
    dispatch({type: ORDER_INGREDIENT_ADD, ingredient: ingredients.find(i => i._id === id)});
  }, [ingredients]);

  const removeIngredient = useCallback((index) => {
    dispatch({type: ORDER_INGREDIENT_REMOVE, index});
  }, []);

  const setModalIngredient = useCallback((ingredient) => {
    dispatch({type: MODAL_INGREDIENT_SET, ingredient});
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
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onIngredientInfo={onIngredientInfo} />
                <BurgerConstructor onPlaceOrder={onPlaceOrder} onAddIngredient={addIngredient} onRemoveIngredient={removeIngredient}/>
              </DndProvider>
              </>
            )
          }
        </main>
      </div>
    </>
  );
}

export default App;
