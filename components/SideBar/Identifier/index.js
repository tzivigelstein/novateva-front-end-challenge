import { useMemo } from 'react'
import styles from './index.module.css'
import useApp from '../../../hooks/useApp'
import NotificationsCount from '../NotificationCount'

export default function Identifier({ name, icon }) {
  const { getAllUnreadNotifications, chats } = useApp()

  const count = useMemo(() => getAllUnreadNotifications(), [chats])

  return (
    <div className={styles.chatIdentifier}>
      <div className={styles.identifier}>
        {icon}
        <span className={styles.identifierName}>{name}</span>
      </div>
      <NotificationsCount className={styles.notificationsCount} number={count} />
    </div>
  )
}
