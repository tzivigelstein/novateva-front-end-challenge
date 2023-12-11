/* eslint-disable react/no-unescaped-entities */
import { useState, useMemo, useRef, useEffect } from 'react'
import styles from './index.module.css'
import useApp from '../../hooks/useApp'
import useAuth from '../../hooks/useAuth'
import MessageTimeAndSender from './MessageTimeAndSender'
import DeleteMessageButton from './DeleteMessageButton'
import ReportMessageButton from './ReportMessageButton'
import Modal from '../Modal'
import { useScreenshot } from 'use-react-screenshot'
import Report from './Report'
import useMessages from '../../hooks/useMessages'
import { getTimeAgo } from './utils'
import UnreadMessagesSeparator from '../UnreadMessagesSeparator'

export default function Message({ message, firstUnreadMessage, lastMessage }) {
  const [deleteMessageControl, setDeleteMessageControl] = useState(false)
  const [reportMessageControl, setReportMessageControl] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const messageRef = useRef()
  const [image, takeImage] = useScreenshot()
  const getImage = () => takeImage(messageRef.current)

  const { user: localUser } = useAuth()
  const { selectedReportOption, updateCurrentReportingMessage, reportMessage, reportDescription, resetReport } =
    useMessages()
  const { currentConversation, activeMessage, setNewActiveMessage, deleteMessage, markAsRead } = useApp()

  const { createdAt, messageText } = message
  const timestamp = new Date(createdAt).getTime()

  const timeago = getTimeAgo(timestamp)
  const [sender, sentByLocalUser] = getUserName(message.postedByUser)

  const senderAndTime = `${sender}, ${timeago}`

  function getUserName() {
    const sentByLocalUser = message.postedByUser === localUser.id

    let sender = sentByLocalUser ? localUser : currentConversation.users.find(user => user.id !== localUser.id)

    if (!sender && !sentByLocalUser) {
      sender = {}
      sender.firstName = 'Delete'
      sender.lastName = 'User'
    }

    return [sentByLocalUser ? 'Me' : `${sender?.firstName} ${sender?.lastName}`, sentByLocalUser]
  }

  function handleRightClick(e) {
    e.preventDefault()
    setNewActiveMessage(message)

    if (sentByLocalUser) {
      setDeleteMessageControl(prev => !prev)
    } else {
      setReportMessageControl(prev => !prev)
    }
  }

  function handleDeleteMessage() {
    setIsDeleteModalOpen(true)
  }

  function handleDeleteModalSuccess() {
    setIsDeleteModalOpen(false)
    deleteMessage(message.id)
  }

  function handleReportMessage() {
    getImage()
    updateCurrentReportingMessage(message)
    setIsReportModalOpen(true)
  }

  function handleReportModalSuccess() {
    setLoading(true)
    reportMessage(reportDescription, image).finally(() => {
      setIsReportModalOpen(false)
      setLoading(false)
      setNewActiveMessage(null)
      resetReport()
    })
  }

  const isFirstUnreadMessage = useMemo(() => {
    return firstUnreadMessage?.id === message?.id
  }, [currentConversation])

  const isLastMessage = useMemo(() => {
    return lastMessage?.id === message?.id
  }, [currentConversation])

  useEffect(() => {
    let timeout = null
    if (isFirstUnreadMessage) {
      messageRef.current.scrollIntoView({
        block: 'center'
      })

      timeout = setTimeout(() => {
        markAsRead(message.chatRoomId)
      }, 6000)
    } else if (isLastMessage && !firstUnreadMessage) {
      messageRef.current.scrollIntoView({
        block: 'center'
      })
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {isFirstUnreadMessage && <UnreadMessagesSeparator />}
      <li ref={messageRef} onContextMenu={handleRightClick} className={styles.messageContainer}>
        <MessageTimeAndSender senderAndTime={senderAndTime} sentByLocalUser={sentByLocalUser} />
        <div aria-selected={activeMessage} className={styles.messageActionsContainer}>
          {activeMessage && activeMessage.id === message.id && deleteMessageControl && (
            <DeleteMessageButton handleDeleteMessage={handleDeleteMessage} />
          )}
          <div style={sentByLocalUser ? { marginLeft: 'auto' } : {}} className={styles.message}>
            <p className={styles.messageText}>{messageText}</p>
          </div>
          {activeMessage && activeMessage.id === message.id && reportMessageControl && (
            <ReportMessageButton handleReportMessage={handleReportMessage} />
          )}
        </div>
      </li>
      {isReportModalOpen && (
        <Modal
          title="New report"
          subtitle={`Report message from ${sender}`}
          onSuccess={handleReportModalSuccess}
          onCancel={() => setIsReportModalOpen(false)}
          onClose={() => setIsReportModalOpen(false)}
          cancelButtonText="Cancel"
          successButtonText="Report"
          successButtonDisabled={selectedReportOption === '' || loading}
          body={<Report sender={sender} senderAndTime={senderAndTime} image={image} />}
        />
      )}
      {isDeleteModalOpen && (
        <Modal
          title="Delet message"
          subtitle="This action is not reversible"
          onSuccess={handleDeleteModalSuccess}
          onCancel={() => setIsDeleteModalOpen(false)}
          onClose={() => setIsDeleteModalOpen(false)}
          cancelButtonText="Cancel"
          successButtonText="Delete"
        />
      )}
    </>
  )
}
