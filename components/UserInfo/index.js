import useAuth from '../../hooks/useAuth'
import UserName from '../UserName'
import UserPicture from '../UserPicture'
import styles from './index.module.css'

export default function UserInfo({ user, bold, status }) {
  return (
    <div className={styles.userInfoContainer}>
      <UserPicture status={status} />
      <div className={styles.info}>
        <UserName bold={bold} name={`${user?.firstName ?? 'Deleted'} ${user?.lastName ?? 'user'}`} />
        {status && <span className={styles.status}>Online</span>}
      </div>
    </div>
  )
}