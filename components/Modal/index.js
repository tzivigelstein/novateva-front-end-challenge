import { Times } from '../Icons'
import styles from './index.module.css'

export default function Modal({
  title = 'A modal',
  subtitle,
  body: Body,
  successButtonText,
  successButtonDisabled,
  cancelButtonText,
  onSuccess,
  onCancel,
  onClose
}) {
  return (
    <div className={styles.modalBackground}>
      <dialog open className={styles.modal}>
        <button className={styles.closeModalButton} onClick={onClose}>
          <Times />
        </button>
        <header>
          <h4 className={styles.modalTitle}>{title}</h4>
          {subtitle && <p>{subtitle}</p>}
        </header>
        <div className={styles.body}>{Body && Body}</div>
        <footer className={styles.buttonsContainer}>
          {cancelButtonText && (
            <button className={styles.cancelButton} onClick={onCancel}>
              {cancelButtonText}
            </button>
          )}
          {successButtonText && (
            <button
              disabled={successButtonDisabled }
              className={styles.successButton}
              onClick={onSuccess}
            >
              {successButtonText}
            </button>
          )}
        </footer>
      </dialog>
    </div>
  )
}
