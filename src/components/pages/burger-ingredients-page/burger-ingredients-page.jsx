import OrderDetails from "../../order-details/order-details";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import styles from "../../app/app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE} from "../../../services/actions/order";
import {placeOrder} from "../../../services/actions";
import {MODAL_INGREDIENT_RESET, MODAL_INGREDIENT_SET} from "../../../services/actions/modal-ingredient";
import {PLACED_ORDER_RESET} from "../../../services/actions/placed-order";

export function BurgerIngredientsPage({ingredients}) {
  const dispatch = useDispatch();
  const modalIngredient = useSelector(store => store.modalIngredient);
  const placedOrder = useSelector(store => store.placedOrder.order);

  const setModalIngredient = useCallback((ingredient) => {
    dispatch({type: MODAL_INGREDIENT_SET, ingredient});
  }, []);

  const resetModalIngredient = useCallback(() => {
    dispatch({type: MODAL_INGREDIENT_RESET});
  }, []);

  const resetPlacedOrder = useCallback(() => {
    dispatch({type: PLACED_ORDER_RESET});
  }, []);

  const onIngredientInfo = useCallback((ingredient) => {
    setModalIngredient(ingredient);
  }, []);

  const addIngredient = useCallback((id) => {
    dispatch({type: ORDER_INGREDIENT_ADD, ingredient: ingredients.find(i => i._id === id)});
  }, [ingredients]);

  const removeIngredient = useCallback((index) => {
    dispatch({type: ORDER_INGREDIENT_REMOVE, index});
  }, []);

  const onPlaceOrder = useCallback((order) => {
    dispatch(placeOrder(order));
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
        <main>
          {
            ingredients.length > 0 && (
              <>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients onIngredientInfo={onIngredientInfo}/>
                  <BurgerConstructor onPlaceOrder={onPlaceOrder} onAddIngredient={addIngredient}
                                     onRemoveIngredient={removeIngredient}/>
                </DndProvider>
              </>
            )
          }
        </main>
      </div>
    </>
  )
}