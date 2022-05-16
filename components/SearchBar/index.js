import styles from './index.module.css'
import { Search } from '../Icons'

export default function SearchBar() {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="search">
        <Search />
      </label>
      <input className={styles.input} id="search" placeholder="User search" />
    </div>
  )
}
