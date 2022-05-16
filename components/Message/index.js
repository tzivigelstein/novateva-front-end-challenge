/* eslint-disable react/no-unescaped-entities */
import { useState, forwardRef, useRef } from 'react'
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

const Message = forwardRef(({ message }, ref) => {
  const [deleteMessageControl, setDeleteMessageControl] = useState(false)
  const [reportMessageControl, setReportMessageControl] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const currentMessageRef = useRef()
  const [image, takeImage] = useScreenshot()
  const getImage = () => takeImage(ref?.current || currentMessageRef?.current)

  const { user: localUser } = useAuth()
  const { selectedReportOption, updateCurrentReportingMessage, reportMessage, reportDescription, resetReport } =
    useMessages()
  const { currentConversation, activeMessage, setNewActiveMessage, deleteMessage } = useApp()
  const { createdAt, message: post } = message

  const { messageText } = post

  const timestamp = new Date(createdAt).getTime()

  const getTimeAgo = timestamp => {
    const DATE_UNITS = {
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    }
    const rtf = new Intl.RelativeTimeFormat()
    const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000
    const getUnitAndValueDate = secondsElapsed => {
      for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
        if (secondsElapsed >= secondsInUnit || unit === 'second') {
          const value = Math.floor(secondsElapsed / secondsInUnit) * -1
          return { value, unit }
        }
      }
    }

    const secondsElapsed = getSecondsDiff(timestamp)
    const { value, unit } = getUnitAndValueDate(secondsElapsed)

    return rtf.format(value, unit)
  }

  const timeago = getTimeAgo(timestamp)
  const [sender, sentByLocalUser] = getUserName(message.postedByUser)

  const senderAndTime = `${sender}, ${timeago}`

  function getUserName(sentBy) {
    const sender = currentConversation.users.find(user => user._id === sentBy) ?? localUser

    const sentByLocalUser = sender._id === localUser._id

    return [sentByLocalUser ? 'Me' : `${sender.firstName} ${sender.lastName}`, sentByLocalUser]
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
    deleteMessage(message._id)
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

  return (
    <>
      <li ref={ref || currentMessageRef} onContextMenu={handleRightClick} className={styles.messageContainer}>
        <MessageTimeAndSender senderAndTime={senderAndTime} sentByLocalUser={sentByLocalUser} />
        <div aria-selected={activeMessage} className={styles.messageActionsContainer}>
          {activeMessage && activeMessage._id === message._id && deleteMessageControl && (
            <DeleteMessageButton handleDeleteMessage={handleDeleteMessage} />
          )}
          <div style={sentByLocalUser ? { marginLeft: 'auto' } : {}} className={styles.message}>
            <p className={styles.messageText}>{messageText}</p>
          </div>
          {activeMessage && activeMessage._id === message._id && reportMessageControl && (
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
          subtitle={'This action is not reversible'}
          onSuccess={handleDeleteModalSuccess}
          onCancel={() => setIsDeleteModalOpen(false)}
          onClose={() => setIsDeleteModalOpen(false)}
          cancelButtonText="Cancel"
          successButtonText="Delete"
        />
      )}
    </>
  )
})

Message.displayName = 'Message'

export default Message
