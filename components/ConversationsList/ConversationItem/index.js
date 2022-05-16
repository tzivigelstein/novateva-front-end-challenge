import { useState, useMemo, useEffect } from 'react'
import styles from './index.module.css'
import useApp from '../../../hooks/useApp'
import useAuth from '../../../hooks/useAuth'
import NotificationsCount from '../../NotificationsCount'
import UserInfo from '../../UserInfo'
import { Trash } from '../../Icons'

export default function ConversationItem({ chat }) {
  const { user: localUser } = useAuth()
  const { setCurrentConversationId, connectToSocket } = useApp()
  const [activeConversationItem, setActiveConversationItem] = useState(null)

  const count = useMemo(() => getUnreadMessagesCount(chat), [chat.messages])

  useEffect(() => {
    const socket = connectToSocket(chat._id)

    return () => socket.close()
  }, [])

  function getUnreadMessagesCount(chat) {
    if (typeof chat === 'undefined') return 0

    return chat?.messages?.reduce((acc, message) => {
      if (!message.readByRecipients.find(recipient => recipient.readByUserId === localUser._id)) {
        return acc + 1
      }

      return acc
    }, 0)
  }

  function updateActiveConversationItem(e) {
    e.preventDefault()
    setActiveConversationItem(chat)
  }

  return (
    <li key={chat._id}>
      <button
        onContextMenu={updateActiveConversationItem}
        onClick={() => setCurrentConversationId(chat._id)}
        className={styles.conversationItem}
      >
        <UserInfo user={chat.users.find(user => user._id !== localUser._id)} status={true} bold={true} />
        {count > 0 && !activeConversationItem && <NotificationsCount number={count} />}
        {activeConversationItem && activeConversationItem._id === chat._id && (
          <button className={styles.deleteConversationButton}>
            <Trash />
          </button>
        )}
      </button>
    </li>
  )
}
