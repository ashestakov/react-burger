import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from '../ingredient-details/ingredient-details';
import {ADD_INGREDIENT, REMOVE_INGREDIENT, RESET} from "../../services/actions/order";
import {SET_INGREDIENTS} from "../../services/actions/ingredients";
import {SET_MODAL_INGREDIENT, UNSET_MODAL_INGREDIENT} from "../../services/actions/modalIngredient";

const DOMAIN = 'https://norma.nomoreparties.space';
const MODAL_ORDER_DETAILS = 'OrderDetails';
const MODAL_INGREDIENT_DETAILS = 'IngredientDetails';

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function App() {
  const ingredients = useSelector(store => store.ingredients);
  const modalIngredient = useSelector(store => store.modalIngredient);
  const modalOrder = useSelector(store => store.modalOrder);
  const [modal, setModal] = useState();
  const dispatch = useDispatch();

  const addIngredient = useCallback((ingredient) => {
    dispatch({type: ADD_INGREDIENT, payload: ingredient});
  }, []);

  const removeIngredient = useCallback((index) => {
    dispatch({type: REMOVE_INGREDIENT, payload: index});
  }, []);

  const setIngredients = useCallback((ingredients) => {
    dispatch({type: SET_INGREDIENTS, payload: ingredients});
  }, []);

  const setModalIngredient = useCallback((ingredient) => {
    dispatch({type: SET_MODAL_INGREDIENT, payload: ingredient});
  }, []);

  const unsetModalIngredient = useCallback((ingredient) => {
    dispatch({type: UNSET_MODAL_INGREDIENT});
  }, []);

  const setModalOrder = useCallback((order) => {
    dispatch({type: 'SET_MODAL_ORDER', payload: order});
  }, []);

  useEffect(() => {
    fetch(`${DOMAIN}/api/ingredients`)
      .then(checkResponse)
      .then(data => {
        setIngredients(data.data);
        dispatch({type: ADD_INGREDIENT, payload: data.data[0]});
      })
      .catch(error => console.error(error));
  }, [setIngredients, dispatch]);

  const onPlaceOrder = useCallback((order) => {
    fetch(`${DOMAIN}/api/orders`, {
        method: 'POST',
        body: JSON.stringify({
          ingredients: [
            order.bun,
            ...order.mainsAndSauces,
            order.bun
          ].map(ingredient => ingredient._id)
        }),
        headers: {
          'content-type': 'application/json'
        }
      }
    ).then(checkResponse)
      .then(data => {
        setModalOrder(data.order);
        setModal(MODAL_ORDER_DETAILS);
        dispatch({type: RESET});
      })
      .catch(error => console.error(error));
  }, []);

  const onIngredientInfo = useCallback((ingredient) => {
    setModalIngredient(ingredient);
    setModal(MODAL_INGREDIENT_DETAILS);
  }, []);

  const onModalClose = useCallback(() => {
    setModal(undefined);
    unsetModalIngredient();
  }, []);

  return (
    <>
      {((modal === MODAL_ORDER_DETAILS) && <OrderDetails order={modalOrder} onClose={onModalClose}/>)}
      {((modal === MODAL_INGREDIENT_DETAILS) &&
        <IngredientDetails ingredient={modalIngredient} onClose={onModalClose}/>)}
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
