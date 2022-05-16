import styles from './index.module.css'
import { Trash } from '../../Icons'

export default function DeleteMessageButton({ handleDeleteMessage }) {
  return (
    <button onClick={handleDeleteMessage} className={styles.deleteMessageButton}>
      <Trash className={styles.trashIcon} />
      Delete
    </button>
  )
}
