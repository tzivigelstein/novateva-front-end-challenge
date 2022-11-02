import styles from './index.module.css'
import { Flag } from '../../Icons'

export default function ReportMessageButton({ handleReportMessage }) {
  return (
    <button onClick={handleReportMessage} className={styles.reportMessageButton}>
      <Flag data-testid="flag-icon" className={styles.flagIcon} />
      Report
    </button>
  )
}
