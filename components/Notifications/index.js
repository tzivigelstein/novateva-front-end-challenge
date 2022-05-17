import { useMemo } from 'react'
import styles from './index.module.css'
import NotificationsCount from '../NotificationsCount'
import { Bell } from '../Icons'
import useApp from '../../hooks/useApp'

export default function Notifications() {
  const { getAllUnreadNotifications, chats } = useApp()

  const count = useMemo(() => getAllUnreadNotifications(), [chats])

  return (
    <button className={styles.notifications}>
      <Bell />
      <div className={styles.notificationsCountContainer}>
        <NotificationsCount number={count} />
      </div>
    </button>
  )
}
