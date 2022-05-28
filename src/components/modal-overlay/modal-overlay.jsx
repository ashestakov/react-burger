import styles from './modal-overlay.module.css'

export default function ModalOverlay({onClick}) {
  return (
    <div className={styles.modalOverlay} onClick={onClick}>
    </div>
  )
}