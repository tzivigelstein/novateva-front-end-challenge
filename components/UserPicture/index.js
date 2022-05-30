import styles from './index.module.css'
import { User } from '../Icons'
import stc from 'string-to-color'
import { useMemo } from 'react'

export default function UserPicture({ user, status }) {
  const userColor = useMemo(() => {
    return stc(user._id)
  }, [user])

  return (
    <div className={styles.pictureContainer}>
      <picture style={{ backgroundColor: userColor || '#FFF' }} className={styles.picture}>
        <User stroke="#fff" />
      </picture>
      {status && <span className={styles.status}></span>}
    </div>
  )
}
