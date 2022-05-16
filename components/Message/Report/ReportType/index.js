import styles from './index.module.css'

export default function ReportType({ value, selectedReportOption, handleReportOption }) {
  return (
    <div className={styles.reportType}>
      <label className={styles.label} htmlFor={value}>
        {value}
      </label>
      <input
        onChange={e => handleReportOption(e.target.value)}
        checked={selectedReportOption === value}
        type="radio"
        name="radio"
        id={value}
        value={value}
      />
    </div>
  )
}
