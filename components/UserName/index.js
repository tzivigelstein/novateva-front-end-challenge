import styles from './index.module.css'

export default function UserName({ id, name, bold }) {
  return (
    <span style={bold ? { fontWeight: 'bold' } : {}} className={styles.name}>
      {name}
      {id && <span className={styles.userId}>#{id?.slice(0, 4)}</span>}
    </span>
  )
}
