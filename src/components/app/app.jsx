import React, {useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from '../ingredient-details/ingredient-details';
import {ORDER_INGREDIENT_ADD, ORDER_INGREDIENT_REMOVE} from "../../services/actions/order";
import {MODAL_INGREDIENT_SET, MODAL_INGREDIENT_RESET} from "../../services/actions/modal-ingredient";
import {getIngredients, initializeAuth, placeOrder} from "../../services/actions";
import {PLACED_ORDER_RESET} from "../../services/actions/placed-order";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {ForgotPasswordPage, IngredientPage, LoginPage, ProfilePage, RegistrationPage} from "../pages";
import {ResetPasswordPage} from "../pages/reset-password-page/reset-password-page";
import {ProtectedRoute} from "../protected-route/protected-route";

function App() {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const modalIngredient = useSelector(store => store.modalIngredient);
  const placedOrder = useSelector(store => store.placedOrder.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth())
  }, []);

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
    <Router>
      <AppHeader/>
      <div className={styles.pageContainer}>
        <Switch>
          <Route path="/" exact={true}>
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
          </Route>
          <Route path={'/login'} component={LoginPage}/>
          <Route path={'/register'} component={RegistrationPage}/>
          <Route path={'/forgot-password'} component={ForgotPasswordPage}/>
          <Route path={'/reset-password'} component={ResetPasswordPage}/>
          <ProtectedRoute path={'/profile'} component={ProfilePage}/>
          <Route path={'/ingredients/:id'} component={IngredientPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
