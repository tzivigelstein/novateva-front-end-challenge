import { useState, useMemo } from 'react'
import MessagesProvider from '../../context/messages/MessagesContext'
import useApp from '../../hooks/useApp'
import useAuth from '../../hooks/useAuth'
import Message from '../Message'
import EmptyMessages from './EmptyMessages'
import styles from './index.module.css'

export default function Conversation() {
  const { user: localUser } = useAuth()
  const { postMessage, currentConversation } = useApp()
  const [message, setMessage] = useState('')

  function handleSendMessage(e) {
    e.preventDefault()
    const newMessage = {
      messageText: message
    }

    postMessage(newMessage)
    setMessage('')
  }

  function handleMessageChange(e) {
    setMessage(e.target.value)
  }

  const firstUnreadMessage = useMemo(() => {
    return currentConversation?.messages?.find(message => {
      const flatRecipients = message.readByRecipients.map(recipient => recipient.readByUserId)
      return !flatRecipients.includes(localUser.id)
    })
  }, [currentConversation])

  const lastMessage = useMemo(() => {
    return currentConversation?.messages?.find((message, _, messages) => {
      return message.id === messages[messages.length - 1].id
    })
  }, [currentConversation])

  return (
    <MessagesProvider>
      <div className={styles.conversation}>
        {currentConversation?.messages.length > 0 && (
          <ul className={styles.messagesContainer}>
            {currentConversation?.messages?.map(item => (
              <Message
                key={item.id}
                message={item}
                firstUnreadMessage={firstUnreadMessage}
                lastMessage={lastMessage}
              />
            ))}
          </ul>
        )}
        {currentConversation?.messages.length === 0 && <EmptyMessages />}
        <form onSubmit={handleSendMessage} className={styles.form}>
          <input
            value={message}
            onChange={handleMessageChange}
            className={styles.messageInput}
            type="text"
            placeholder="Start typing here"
          />
          <button className={styles.sendButton}>Send</button>
        </form>
      </div>
    </MessagesProvider>
  )
}
