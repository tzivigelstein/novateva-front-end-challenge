import UserName from '../UserName'
import UserPicture from '../UserPicture'
import styles from './index.module.css'

export default function UserInfo({ user, bold, status, showId }) {
  return (
    <div className={styles.userInfoContainer}>
      <UserPicture user={user} status={status} />
      <div className={styles.info}>
        <UserName
          bold={bold}
          name={`${user?.firstName ?? 'Deleted'} ${user?.lastName ?? 'user'}`}
          id={showId ? user?._id : null}
        />
        {status && (
          <span data-testid="user-status" className={styles.status}>
            Online
          </span>
        )}
      </div>
    </div>
  )
}
