import styles from './index.module.css'
import SearchBar from '../SearchBar'
import Status from '../Status'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <SearchBar />
      <Status />
    </nav>
  )
}
