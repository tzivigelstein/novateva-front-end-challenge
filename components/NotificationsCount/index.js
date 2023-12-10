import styles from './index.module.css'

export default function NotificationsCount({ number = 0 }) {
  return (
    <div className={styles.notificationsCountContainer}>
      <span data-testid="notification-count" className={styles.notificationsCount}>{Number.isNaN(number) ? 0 : number}</span>
    </div>
  )
}
