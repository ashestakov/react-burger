import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch} from "react-redux";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import {getIngredients} from "../../services/actions/ingredients";
import {initializeAuth} from "../../services/actions/auth";
import {
  BurgerIngredientsPage,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage
} from "../../pages";
import {ResetPasswordPage} from "../../pages/reset-password-page/reset-password-page";
import {ProtectedRoute} from "../protected-route/protected-route";
import {UnauthorizedUserRoute} from "../unauthorized-user-route/unauthorized-user-route";

function App() {
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
          <Route path={["/", "/ingredients/:id"]} exact={true} component={BurgerIngredientsPage} />
          <UnauthorizedUserRoute path={'/login'} exact={true} component={LoginPage}/>
          <UnauthorizedUserRoute path={'/register'} exact={true} component={RegistrationPage}/>
          <UnauthorizedUserRoute path={'/forgot-password'} exact={true} component={ForgotPasswordPage}/>
          <UnauthorizedUserRoute path={'/reset-password'} exact={true} component={ResetPasswordPage}/>
          <ProtectedRoute path={'/profile'} component={ProfilePage}/>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
