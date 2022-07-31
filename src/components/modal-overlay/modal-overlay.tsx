import styles from './modal-overlay.module.css'
import {SyntheticEvent} from "react";

function ModalOverlay({onClick}: {onClick: (e: SyntheticEvent) => void}) {
  return (
    <div className={styles.modalOverlay} onClick={onClick}>
    </div>
  )
}

export default ModalOverlay;