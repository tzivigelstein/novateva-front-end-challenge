import styles from './index.module.css'
import { Trash } from '../../Icons'

export default function DeleteMessageButton({ handleDeleteMessage }) {
  return (
    <button onClick={handleDeleteMessage} className={styles.deleteMessageButton}>
      <Trash data-testid="trash-icon" className={styles.trashIcon} />
      Delete
    </button>
  )
}
