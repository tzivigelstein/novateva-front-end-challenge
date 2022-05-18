import useAuth from '../../../hooks/useAuth'
import useMessages from '../../../hooks/useMessages'
import styles from './index.module.css'
import ReportType from './ReportType'

const REPORT_TYPES = ['is suspicious or spam', 'is abusive or harmful', 'expresses intentions of self-harm or suicide']

const DESCRIPTION_PARTS = ['feel that the message sent by', 'and I would like to get it reviewed.']

export default function Report({ image, sender, senderAndTime }) {
  const { user: localUser } = useAuth()
  const { currentReportingMessage, selectedReportOption, setSelectedReportOption, updateReportDescription } =
    useMessages()

  function handleReportOption(value) {
    setSelectedReportOption(value)
    const description = `I ${localUser.firstName} ${localUser.lastName} ${DESCRIPTION_PARTS[0]} ${sender} ${value} ${DESCRIPTION_PARTS[1]}`
    updateReportDescription(description)
  }

  return (
    <div className={styles.reportContainer}>
      <img
        className={styles.screenshot}
        src={image}
        alt={`Report message - ${currentReportingMessage.messageText} from ${senderAndTime}`}
      />
      <ul className={styles.reportOptionsList}>
        {REPORT_TYPES.map(type => (
          <ReportType
            key={type}
            value={type}
            selectedReportOption={selectedReportOption}
            handleReportOption={handleReportOption}
          />
        ))}
      </ul>
      <h4>Your message would be</h4>
      <p style={{ whiteSpace: 'pre-wrap', gap: '1ch' }}>
        <span className={styles.bold}>
          I {localUser.firstName} {localUser.lastName}
        </span>
        {DESCRIPTION_PARTS[0]} <span className={styles.bold}>{sender}</span>
        <span className={styles.bold}>{selectedReportOption === '' ? 'is...' : selectedReportOption}</span>
        {DESCRIPTION_PARTS[1]}
      </p>
    </div>
  )
}
