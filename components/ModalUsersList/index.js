import { useState, useEffect } from 'react'
import styles from './index.module.css'
import useApp from '../../hooks/useApp'
import ActivityIndicator from '../ActivityIndicator'
import UserItem from '../ModalUserItem'
import useAuth from '../../hooks/useAuth'

export default function ModalUsersList() {
  const { user: localUser } = useAuth()
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
          {users
            .filter(user => user._id !== localUser._id)
            .map(user => (
              <UserItem key={user._id} user={user} />
            ))}
        </ul>
      ) : (
        <>{loading ? <ActivityIndicator /> : <p>It seems that there are no users...</p>}</>
      )}
    </div>
  )
}
