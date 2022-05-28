import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import OrderDetails from "./components/order-details/order-details";
import IngredientDetails from './components/ingredient-details/ingredient-details';

const DOMAIN = 'https://norma.nomoreparties.space';
const MODAL_ORDER_DETAILS = 'OrderDetails';
const MODAL_INGREDIENT_DETAILS = 'IngredientDetails';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [modalIngredient, setModalIngredient] = React.useState();
  const [placedOrder, setPlacedOrder] = React.useState();
  const [modal, setModal] = React.useState();

  React.useEffect(() => {
    fetch(`${DOMAIN}/api/ingredients`)
      .then(response => response.json())
      .then(data => {
        setIngredients(data.data);
      })
      .catch(error => console.error(error));
  }, [setIngredients]);

  const onPlaceOrder = React.useCallback((order) => {
    setPlacedOrder(order);
    setModal(MODAL_ORDER_DETAILS);
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
      {((modal === MODAL_ORDER_DETAILS) && <OrderDetails order={placedOrder} onClose={onModalClose}/>)}
      {((modal === MODAL_INGREDIENT_DETAILS) &&
        <IngredientDetails ingredient={modalIngredient} onClose={onModalClose}/>)}
      <div id="page-constructor">
        <header>
          <AppHeader/>
        </header>
        <main>
          {
            ingredients.length > 0 && (
              <>
                <BurgerIngredients ingredients={ingredients} onIngredientInfo={onIngredientInfo}/>
                <BurgerConstructor ingredients={ingredients} onPlaceOrder={onPlaceOrder}/>
              </>
            )
          }
        </main>
      </div>
    </>
  );
}

export default App;
