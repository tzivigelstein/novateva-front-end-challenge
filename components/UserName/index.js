import styles from './index.module.css'

export default function UserName({ name, bold }) {
  return (
    <span style={bold ? { fontWeight: 'bold' } : {}} className={styles.name}>
      {name}
    </span>
  )
}
