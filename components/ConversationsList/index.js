import { useState, useEffect } from 'react'
import styles from './index.module.css'
import UserInfo from '../UserInfo'
import Modal from '../Modal'
import useAuth from '../../hooks/useAuth'
import useApp from '../../hooks/useApp'
import ModalUsersList from '../ModalUsersList'
import ConversationItem from './ConversationItem'
import ActivityIndicator from '../ActivityIndicator'

export default function ConversationsList() {
  function handleClick() {
    setIsModalOpen(true)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user: localUser } = useAuth()
  const { createNewChat, chats, selectedUserId, setSelectedUser, getAllChats } = useApp()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllChats().finally(() => setLoading(false))
  }, [])

  async function onModalSuccess() {
    setIsModalOpen(false)
    setSelectedUser(null)
    await createNewChat([localUser.id, selectedUserId])

    await getAllChats()
  }

  function onCancelOrCloseModal() {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <>
      <aside className={styles.aside}>
        <div className={styles.chatsContainer}>
          <header className={styles.chatAsideHeader}>
            <UserInfo user={localUser} status={true} bold={true} showId={true} />
          </header>
          {!loading && chats.length > 0 ? (
            <ul className={styles.chatsList}>
              {chats.length > 0 && chats.map(chat => <ConversationItem key={chat.id} chat={chat} />)}
            </ul>
          ) : (
            <div className={styles.noChatsContainer}>
              {loading && <ActivityIndicator color="#858585" />}
              {!loading && chats.length === 0 && <p>No chats around here...</p>}
            </div>
          )}
        </div>

        <button className={styles.newChatButton} onClick={handleClick}>
          New chat
        </button>
      </aside>
      {isModalOpen && (
        <Modal
          title="Create a new chat"
          subtitle="Start a conversation with somebody"
          body={<ModalUsersList />}
          onSuccess={onModalSuccess}
          onCancel={onCancelOrCloseModal}
          onClose={onCancelOrCloseModal}
          successButtonText="Create"
        />
      )}
    </>
  )
}
