import styles from "../burger-ingredients-page/burger-ingredients-page.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import React, {useCallback} from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {BurgerIngredientsPage} from "../burger-ingredients-page/burger-ingredients-page";
import Modal from "../../components/modal/modal";

export function IngredientPageModalSwitch() {
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const onModalClose = useCallback(() => {
    history.push('/');
  }, []);

  return (
    <>
      <Switch location={background || location}>
        <Route path={"/"} exact={true} component={BurgerIngredientsPage}/>
        <Route path={"/ingredients/:id"} exact={true}>
          <div className={'mt-30 ' + styles.standaloneIngredientContainer}>
            <p className={'text text_type_main-medium'}>
              Детали ингредиента
            </p>
            <IngredientDetails/>
          </div>
        </Route>
      </Switch>
      {background && (
        <Modal onClose={onModalClose} title={'Детали ингредиента'}>
          <IngredientDetails/>
        </Modal>
      )}
    </>
  )
}