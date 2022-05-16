import NotificationsCount from '../NotificationCount'
import styles from './index.module.css'

export default function Identifier({ name, icon }) {
  return (
    <div className={styles.chatIdentifier}>
      <div className={styles.identifier}>
        {icon}
        <span className={styles.identifierName}>{name}</span>
      </div>
      <NotificationsCount className={styles.notificationsCount} number={19} />
    </div>
  )
}
