import React, {ReactNode, useCallback} from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import Modal from "../modal/modal";
import styles from "./page-modal-switch.module.css";

type LocationState = {
  background?: Location;
}

export function PageModalSwitch(
  {page, modalContent, modalTitle, backgroundPath, foregroundPath}:
    {page: ReactNode, modalContent: ReactNode, modalTitle: string, backgroundPath: string, foregroundPath: string}
) {
  const history = useHistory();
  const location = useLocation<LocationState>();
  // при попытке типизировать background, сталкиваюсь с ошибкой TS "Location is not a generic",
  // хотя чуть выше Location как раз используется как дженерик
  // @ts-ignore
  const background = (location as Location).state?.background;

  const onModalClose = useCallback(() => {
    history.push(backgroundPath);
  }, []);

  return (
    <>
      <Switch location={background || location}>
        <Route path={backgroundPath} exact={true}>
          {page}
        </Route>
        <Route path={foregroundPath} exact={true}>
          <div className={'mt-30 ' + styles.standaloneContainer}>
            <p className={'text text_type_main-medium'}>
              {modalTitle}
            </p>
            {modalContent}
          </div>
        </Route>
      </Switch>
      {background && (
        <Modal onClose={onModalClose} title={modalTitle}>
          {modalContent}
        </Modal>
      )}
    </>
  )
}