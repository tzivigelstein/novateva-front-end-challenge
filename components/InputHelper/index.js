import styles from './index.module.css'

export default function InputHelper({ children }) {
  return <span className={styles.inputHelper}>{children}</span>
}
