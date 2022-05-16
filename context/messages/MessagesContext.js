import { useState, createContext } from 'react'
import axiosClient from '../../config/axiosClient'

export const MessagesContext = createContext()

export default function MessagesProvider({ children }) {
  const [currentReportingMessage, setCurrentReportingMessage] = useState(null)
  const [selectedReportOption, setSelectedReportOption] = useState('')
  const [reportDescription, setReportDescription] = useState('')

  function updateCurrentReportingMessage(message) {
    setCurrentReportingMessage(message)
  }

  async function reportMessage(description, image64) {
    return axiosClient.post(`/complaints`, { description, file_64: image64 })
  }

  function updateReportDescription(description) {
    setReportDescription(description)
  }

  function resetReport() {
    setSelectedReportOption('')
    updateReportDescription('')
    updateCurrentReportingMessage(null)
  }

  return (
    <MessagesContext.Provider
      value={{
        currentReportingMessage,
        selectedReportOption,
        reportDescription,
        updateCurrentReportingMessage,
        setSelectedReportOption,
        reportMessage,
        updateReportDescription,
        resetReport
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}
