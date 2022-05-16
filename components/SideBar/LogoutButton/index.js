import useAuth from '../../../hooks/useAuth'
import { Config } from '../../Icons'
import styles from './index.module.css'
import { useRouter } from 'next/router'

export default function LogoutButton() {
  const router = useRouter()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    router.replace('/login')
  }

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      <Config />
      Logout
    </button>
  )
}
