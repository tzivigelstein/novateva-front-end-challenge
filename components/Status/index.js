import { useState } from 'react'
import styles from './index.module.css'
import useAuth from '../../hooks/useAuth'
import { Flag } from '../Icons'
import Notifications from '../Notifications'
import UserInfo from '../UserInfo'
import Modal from '../Modal'
import ReportsHistory from '../ReportsHistory'

export default function Status() {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleReportsHistory() {
    setIsModalOpen(true)
  }

  function onModalInteraction() {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className={styles.status}>
        <button onClick={handleReportsHistory} className={styles.reportsButton}>
          <Flag />
          Reports
        </button>
        <UserInfo user={user} />
        <Notifications />
      </div>
      {isModalOpen && (
        <Modal
          title="Your reports history"
          subtitle="Check your reports history"
          body={<ReportsHistory />}
          onSuccess={onModalInteraction}
          onCancel={onModalInteraction}
          onClose={onModalInteraction}
          successButtonText="Close"
        />
      )}
    </>
  )
}
