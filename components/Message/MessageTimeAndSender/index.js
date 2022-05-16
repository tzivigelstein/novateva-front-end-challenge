import styles from './index.module.css'

export default function MessageTimeAndSender({ senderAndTime, sentByLocalUser }) {
  return (
    <span style={sentByLocalUser ? { alignSelf: 'flex-end' } : {}} className={styles.senderAndTime}>
      {senderAndTime}
    </span>
  )
}
