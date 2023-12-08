import { useState, useEffect } from 'react'
import styles from './index.module.css'
import useApp from '../../hooks/useApp'
import ActivityIndicator from '../ActivityIndicator'
import UserItem from '../ModalUserItem'

export default function ModalUsersList() {
  const { users, getAllUsers } = useApp()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllUsers().finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.modalUserListContainer}>
      {users.length > 0 ? (
        <ul className={styles.usersList}>
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      ) : (
        <>{loading ? <ActivityIndicator /> : <p>It seems that there are no users...</p>}</>
      )}
    </div>
  )
}
