import styles from './index.module.css'

export default function ReportItem({ report }) {
  const reportDate = new Date(report.createdAt).toLocaleDateString()

  return (
    <li className={styles.report}>
      <span>{reportDate}</span>
      <p className={styles.reportDescription}>{report.description}</p>
    </li>
  )
}
