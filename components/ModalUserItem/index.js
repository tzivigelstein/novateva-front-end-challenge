import useApp from '../../hooks/useApp'
import { ArrowRight, Check } from '../Icons'
import UserInfo from '../UserInfo'
import styles from './index.module.css'

export default function UserItem({ user }) {
  const { selectedUserId, setSelectedUser } = useApp()
  const { id: userId } = user

  const isSelected = selectedUserId === userId

  return (
    <li className={styles.userItem}>
      <button aria-selected={isSelected} className={styles.userItemButton} onClick={() => setSelectedUser(userId)}>
        <UserInfo user={user} bold={true} showId={true} />
        <div className={styles.userSelectButton}>
          {isSelected ? (
            <Check className={styles.userSelectedButtonIcon} />
          ) : (
            <ArrowRight className={styles.userSelectButtonIcon} />
          )}
        </div>
      </button>
    </li>
  )
}
