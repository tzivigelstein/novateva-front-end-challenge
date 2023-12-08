import { useState, useMemo, useEffect } from 'react'
import styles from './index.module.css'
import useApp from '../../../hooks/useApp'
import useAuth from '../../../hooks/useAuth'
import NotificationsCount from '../../NotificationsCount'
import UserInfo from '../../UserInfo'
import { Trash } from '../../Icons'
import Modal from '../../Modal'

export default function ConversationItem({ chat }) {
  const { user: localUser } = useAuth()
  const {
    setCurrentConversationId,
    connectToSocket,
    getUnreadMessagesCount,
    activeConversation,
    updateActiveConversation,
    deleteConversation
  } = useApp()

  const count = useMemo(() => getUnreadMessagesCount(chat), [chat.messages])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const socket = connectToSocket(chat.id)

    return () => socket.close()
  }, [])

  function updateActiveConversationItem(e) {
    e.preventDefault()
    updateActiveConversation(prev => {
      return prev === chat ? null : chat
    })
  }

  function handleDeleteConversation(e) {
    e.stopPropagation()

    setIsModalOpen(true)
  }

  function handleDeleteConversationSuccess() {
    updateActiveConversation(null)
    deleteConversation(chat.id)
    setIsModalOpen(false)
  }

  function onInteraction() {
    setIsModalOpen(false)
    updateActiveConversation(null)
  }

  return (
    <>
      <li key={chat.id}>
        <button
          onContextMenu={updateActiveConversationItem}
          onClick={() => setCurrentConversationId(chat.id)}
          className={styles.conversationItem}
        >
          <UserInfo
            user={chat.users.find(user => user.id !== localUser.id)}
            status={true}
            bold={true}
            showId={true}
          />
          {count > 0 && activeConversation?.id !== chat.id && <NotificationsCount number={count} />}
          {activeConversation && activeConversation.id === chat.id && (
            // role assigned to avoid: "Button cannot appear as a descendant of button"
            <div onClick={handleDeleteConversation} role="button" className={styles.deleteConversationButton} value="">
              <Trash />
            </div>
          )}
        </button>
      </li>
      {isModalOpen && (
        <Modal
          title="Delete conversation"
          subtitle="This action is not reversible"
          successButtonText="Delete"
          cancelButtonText="Cancel"
          onSuccess={handleDeleteConversationSuccess}
          onCancel={onInteraction}
          onClose={onInteraction}
        />
      )}
    </>
  )
}
