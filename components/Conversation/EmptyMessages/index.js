import styles from './index.module.css'

export default function EmptyMessages() {
  return (
    <div className={styles.noMessages}>
      <p className={styles.text}>Hmm... There seems to be no messages yet</p>
      <img
        className={styles.emptyStateImage}
        src="/empty-messages.svg"
        alt="Guy holding a box while a woman is looking inside of it"
      />
    </div>
  )
}
