import { useState, useEffect, useRef, Fragment } from 'react'
import MessagesProvider from '../../context/messages/MessagesContext'
import useApp from '../../hooks/useApp'
import useAuth from '../../hooks/useAuth'
import Message from '../Message'
import UnreadMessagesSeparator from '../UnreadMessagesSeparator'
import EmptyMessages from './EmptyMessages'
import styles from './index.module.css'

export default function Conversation() {
  const { postMessage, currentConversation, markAsRead } = useApp()
  const { user: localUser } = useAuth()
  const [message, setMessage] = useState('')

  const firstUnreadMessageRef = useRef()
  const lastMessageRef = useRef()

  const noMessages = currentConversation?.messages?.length === 0

  useEffect(() => {
    if (firstUnreadMessageRef.current) {
      firstUnreadMessageRef.current.scrollIntoView({
        block: 'center'
      })
    } else if (!noMessages) {
      lastMessageRef.current.scrollIntoView()
    }
  }, [currentConversation])

  useEffect(() => {
    if (!noMessages) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1
      }

      const observer = new IntersectionObserver(entries => {
        if (firstUnreadMessage && entries[0]?.isIntersecting) {
          markAsRead(currentConversation._id)
        }
      }, options)

      observer.observe(lastMessageRef.current)
    }
  }, [noMessages])

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

  const firstUnreadMessage = getFirstUnreadMessage(currentConversation && currentConversation)

  function getFirstUnreadMessage(chat) {
    if (!chat) return

    return chat.messages.find(
      message => !message.readByRecipients.find(recipient => recipient.readByUserId === localUser._id)
    )
  }

  return (
    <MessagesProvider>
      <div className={styles.conversation}>
        {currentConversation?.messages.length > 0 && (
          <ul className={styles.messagesContainer}>
            {currentConversation?.messages?.map((item, _, messages) => {
              const isFirstUnreadMessage = firstUnreadMessage && item._id === firstUnreadMessage._id
              const isLastMessage = item._id === messages.at(-1)._id

              if (isLastMessage) {
                return <Message ref={lastMessageRef} key={item._id} message={item} />
              }

              if (isFirstUnreadMessage) {
                return (
                  <Fragment key={item._id}>
                    <UnreadMessagesSeparator />
                    <Message ref={firstUnreadMessageRef} message={item} />
                  </Fragment>
                )
              }

              return <Message key={item._id} message={item} />
            })}
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
