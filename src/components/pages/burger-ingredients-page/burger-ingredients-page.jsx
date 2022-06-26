import OrderDetails from "../../order-details/order-details";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import styles from "./burger-ingredients-page.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE} from "../../../services/actions/order";
import {placeOrder} from "../../../services/actions/order";
import {PLACED_ORDER_RESET} from "../../../services/actions/placed-order";
import {useHistory, useRouteMatch} from "react-router-dom";
import Modal from "../../modal/modal";

export function BurgerIngredientsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();

  const ingredients = useSelector(store => store.ingredients.ingredients);

  const [isIngredientInModal, setIsIngredientInModal] = useState(false);
  const id = match.params.id;
  const selectedIngredient = ingredients.find(ingredient => ingredient._id === id);
  const placedOrder = useSelector(store => store.placedOrder.order);
  const accessToken = useSelector(store => store.auth.accessToken);

  const setSelectedIngredient = useCallback((ingredient) => {
    history.push(`/ingredients/${ingredient._id}`);
    setIsIngredientInModal(true);
  }, [history]);

  const resetPlacedOrder = useCallback(() => {
    dispatch({type: PLACED_ORDER_RESET});
  }, []);

  const onIngredientInfo = useCallback((ingredient) => {
    setSelectedIngredient(ingredient);
  }, []);

  const addIngredient = useCallback((id) => {
    dispatch({type: ORDER_INGREDIENT_ADD, ingredient: ingredients.find(i => i._id === id)});
  }, [ingredients]);

  const removeIngredient = useCallback((index) => {
    dispatch({type: ORDER_INGREDIENT_REMOVE, index});
  }, []);

  const onPlaceOrder = useCallback((order) => {
    if (accessToken) {
      dispatch(placeOrder(order));
    } else {
      history.push("/login");
    }
  }, []);

  const onOrderModalClose = useCallback(() => {
    resetPlacedOrder();
  }, []);

  const onIngredientModalClose = useCallback(() => {
    history.push('/');
    setIsIngredientInModal(false);
  }, [])

  if (match.params.id && !isIngredientInModal) {
    return (
      selectedIngredient && (
        <div className={'mt-30 ' + styles.standaloneIngredientContainer}>
          <p className={'text text_type_main-medium'}>
            Детали ингредиента
          </p>
          <IngredientDetails ingredient={selectedIngredient}/>
        </div>
      )
    )
  }

  return (
    <>
      {placedOrder && (
        <Modal title='' onClose={onOrderModalClose}>
          <div className={"pt-4 pl-4 pr-4"}>
            <OrderDetails order={placedOrder}/>
          </div>
        </Modal>
      )}
      {selectedIngredient && (
        <Modal title={"Детали ингредиента"} onClose={onIngredientModalClose}>
          <div className={"pt-4 pl-4 pr-4"}>
            <IngredientDetails ingredient={selectedIngredient}/>
          </div>
        </Modal>
      )}
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