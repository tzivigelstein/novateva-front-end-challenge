import NotificationsCount from '../NotificationsCount'
import { Bell } from '../Icons'
import styles from './index.module.css'

export default function Notifications() {
  return (
    <button className={styles.notifications}>
      <Bell />
      <div className={styles.notificationsCountContainer}>
        <NotificationsCount number={24} />
      </div>
    </button>
  )
}
