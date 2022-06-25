import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import {getIngredients, initializeAuth} from "../../services/actions";
import {BurgerIngredientsPage, ForgotPasswordPage, IngredientPage, LoginPage, ProfilePage, RegistrationPage} from "../pages";
import {ResetPasswordPage} from "../pages/reset-password-page/reset-password-page";
import {ProtectedRoute} from "../protected-route/protected-route";
import {UnauthorizedUserRoute} from "../unauthorized-user-route/unauthorized-user-route";

function App() {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(initializeAuth())
  }, []);

  return (
    <Router>
      <AppHeader/>
      <div className={styles.pageContainer}>
        <Switch>
          <Route path={["/", "/ingredients/:id"]} exact={true}>
            <BurgerIngredientsPage ingredients={ingredients}/>
          </Route>
          <UnauthorizedUserRoute path={'/login'} component={LoginPage}/>
          <UnauthorizedUserRoute path={'/register'} component={RegistrationPage}/>
          <UnauthorizedUserRoute path={'/forgot-password'} component={ForgotPasswordPage}/>
          <UnauthorizedUserRoute path={'/reset-password'} component={ResetPasswordPage}/>
          <ProtectedRoute path={'/profile'} component={ProfilePage}/>
          <Route path={'/ingredients/:id'} component={IngredientPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
