import styles from './index.module.css'

export default function UserPicture({ status }) {
  return (
    <div className={styles.pictureContainer}>
      <picture className={styles.picture}>
        <img className={styles.image} src="/user.png" alt={`USername or name profile photo`} />
      </picture>
      {status && <span className={styles.status}></span>}
    </div>
  )
}
