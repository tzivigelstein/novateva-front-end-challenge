import styles from './index.module.css'

export default function UnreadMessagesSeparator() {
  return (
    <div className={styles.unreadMessagesContainer}>
      <span className={styles.unread}>Unread</span>
      <div className={styles.separator}></div>
    </div>
  )
}
