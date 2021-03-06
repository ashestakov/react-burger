import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React, {ReactNode, SyntheticEvent} from "react";

const modalRoot = document.getElementById("react-modals")!;

function Modal({children, title, onClose}: { children: ReactNode, title: string, onClose: () => any }) {
  const onKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onKeyDown]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modal + "  p-10"}>
          <div className={styles.modalHeader}>
          <span className={"text text_type_main-large"}>
            {title}
          </span>
            <CloseIcon type="primary" onClick={onClose}/>
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay onClick={onClose}/>
    </>,
    modalRoot
  )
}

export default Modal;