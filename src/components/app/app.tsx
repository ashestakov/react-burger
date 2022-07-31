import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import {getIngredients} from "../../services/actions/ingredients";
import {initializeAuth} from "../../services/actions/auth";
import {
  BurgerIngredientsPage,
  PageModalSwitch,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  OrderInfoPage
} from "../../pages";
import {ResetPasswordPage} from "../../pages/reset-password-page/reset-password-page";
import {ProtectedRoute} from "../protected-route/protected-route";
import {UnauthorizedUserRoute} from "../unauthorized-user-route/unauthorized-user-route";
import {useAppDispatch} from "../../hooks";
import {FeedPage} from "../../pages/feed-page/feed-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {OrderInfo} from "../order-info/order-info";
import {OrderHistoryPage} from "../../pages/order-history-page/order-history-page";
import Modal from "../modal/modal";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(initializeAuth())
  }, []);

  return (
    <Router>
      <AppHeader/>
      <div className={styles.pageContainer}>
        <Switch>
          <Route path={"/"} exact={true} component={BurgerIngredientsPage} />
          <Route path={"/ingredients/:id"} exact={true} >
            <PageModalSwitch
              foregroundPath={"/ingredients/:id"}
              backgroundPath={"/"}
              page={<BurgerIngredientsPage/>}
              modalTitle={'Детали ингредиента'}
              modalContent={<IngredientDetails />}
            />
          </Route>
          <Route path={["/feed/:id", "/feed/"]} component={FeedPage} />
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
