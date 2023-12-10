import styles from './index.module.css'

export default function UserName({ id, name, bold }) {
  return (
    <span style={bold ? { fontWeight: 'bold' } : {}} className={styles.name}>
      {name}
      {id && (
        <span data-testid="user-id" className={styles.userId}>
          #{id}
        </span>
      )}
    </span>
  )
}
