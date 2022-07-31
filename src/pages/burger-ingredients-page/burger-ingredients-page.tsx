import OrderDetails from "../../components/order-details/order-details";
import styles from "./burger-ingredients-page.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import React, {useCallback} from "react";
import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE} from "../../services/actions/order";
import {placeOrder} from "../../services/actions/order";
import {PLACED_ORDER_RESET} from "../../services/actions/placed-order";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import Modal from "../../components/modal/modal";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Ingredient} from "../../types/ingredient";
import {Order} from "../../types/order";

export function BurgerIngredientsPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const ingredients = useAppSelector((store) => store.ingredients.ingredients);

  const placedOrder = useAppSelector((store) => store.placedOrder.order);
  const accessToken = useAppSelector((store) => store.auth.accessToken);

  const resetPlacedOrder = useCallback(() => {
    dispatch({type: PLACED_ORDER_RESET});
  }, []);

  const onIngredientInfo = useCallback((ingredient: Ingredient) => {
    history.push(`/ingredients/${ingredient._id}`, {background: location});
  }, []);

  const addIngredient = useCallback((id: string) => {
    dispatch({type: ORDER_INGREDIENT_ADD, ingredient: ingredients.find(i => i._id === id)});
  }, [ingredients]);

  const removeIngredient = useCallback((index: number) => {
    dispatch({type: ORDER_INGREDIENT_REMOVE, index});
  }, []);

  const onPlaceOrder = useCallback((order: Order) => {
    if (accessToken) {
      dispatch(placeOrder(order, accessToken));
    } else {
      history.push("/login");
    }
  }, []);

  const onOrderModalClose = useCallback(() => {
    resetPlacedOrder();
  }, []);

  return (
    <>
      {placedOrder && (
        <Modal title='' onClose={onOrderModalClose}>
          <div className={"pt-4 pl-4 pr-4"}>
            <OrderDetails order={placedOrder}/>
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