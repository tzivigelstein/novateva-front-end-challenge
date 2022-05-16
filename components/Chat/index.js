import styles from './index.module.css'
import Conversation from '../Conversation'
import ConversationsList from '../ConversationsList'
import useApp from '../../hooks/useApp'

export default function Chat() {
  const { currentConversation } = useApp()

  return (
    <section className={styles.chatContainer}>
      <ConversationsList />
      {currentConversation && <Conversation />}
    </section>
  )
}
