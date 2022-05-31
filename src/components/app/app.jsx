import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from '../ingredient-details/ingredient-details';
import {IngredientsContext} from "../../services/ingredientsContext";
import {OrderContext} from "../../services/orderContext";

const DOMAIN = 'https://norma.nomoreparties.space';
const MODAL_ORDER_DETAILS = 'OrderDetails';
const MODAL_INGREDIENT_DETAILS = 'IngredientDetails';

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const ORDER_INITIAL_STATE = {bun: null, mainsAndSauces: []};

const orderReducer = (order, action) => {
  const ingredient = action.payload;
  switch (action.type) {
    case 'ADD_INGREDIENT':
      if (ingredient.type === 'bun') {
        return {
          bun: ingredient,
          mainsAndSauces: order.mainsAndSauces
        }
      } else {
        return {
          bun: order.bun,
          mainsAndSauces: [...order.mainsAndSauces, ingredient]
        }
      }
    case 'REMOVE_INGREDIENT':
      return {
        bun: order.bun,
        mainsAndSauces: order.mainsAndSauces.filter((ingredient, index) => index !== action.payload)
      }
    case 'RESET':
      return ORDER_INITIAL_STATE;
    default:
      return order;
  }
}

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [modalIngredient, setModalIngredient] = React.useState();
  const [modalOrder, setModalOrder] = React.useState();
  const [modal, setModal] = React.useState();
  const [order, orderDispatcher] = React.useReducer(orderReducer, ORDER_INITIAL_STATE);

  const addIngredient = React.useCallback((ingredient) => {
    orderDispatcher({type: 'ADD_INGREDIENT', payload: ingredient});
  }, []);

  const removeIngredient = React.useCallback((index) => {
    orderDispatcher({type: 'REMOVE_INGREDIENT', payload: index});
  }, []);

  React.useEffect(() => {
    fetch(`${DOMAIN}/api/ingredients`)
      .then(checkResponse)
      .then(data => {
        setIngredients(data.data);
        orderDispatcher({type: 'ADD_INGREDIENT', payload: data.data[0]});
      })
      .catch(error => console.error(error));
  }, [setIngredients]);

  const onPlaceOrder = React.useCallback((order) => {
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
        orderDispatcher('RESET');
      })
      .catch(error => console.error(error));
  }, []);

  const onIngredientInfo = React.useCallback((ingredient) => {
    setModalIngredient(ingredient);
    setModal(MODAL_INGREDIENT_DETAILS);
  }, []);

  const onModalClose = React.useCallback(() => {
    setModal(undefined);
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
                <OrderContext.Provider value={order}>
                  <IngredientsContext.Provider value={ingredients}>
                    <BurgerIngredients onIngredientInfo={onIngredientInfo} onClickIngredient={addIngredient}/>
                    <BurgerConstructor onPlaceOrder={onPlaceOrder} onRemoveIngredient={removeIngredient}/>
                  </IngredientsContext.Provider>
                </OrderContext.Provider>
              </>
            )
          }
        </main>
      </div>
    </>
  );
}

export default App;
