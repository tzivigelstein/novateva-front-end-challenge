import { useState, useEffect } from 'react'
import styles from './index.module.css'
import ActivityIndicator from '../ActivityIndicator'
import useApp from '../../hooks/useApp'
import ReportItem from './ReportItem'

export default function ReportsHistory() {
  const [loading, setLoading] = useState(false)
  const { reports = [], getReports } = useApp()

  useEffect(() => {
    setLoading(true)
    getReports().finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.reportsHistory}>
      {loading && <ActivityIndicator />}
      {!loading && reports.length > 0 && (
        <ul className={styles.reports}>
          {reports.map(report => (
            <ReportItem key={report.id} report={report} />
          ))}
        </ul>
      )}
      {!loading && reports.length === 0 && <p>No reports yet...</p>}
    </div>
  )
}
