import { useContext } from 'react'
import { MessagesContext } from '../context/messages/MessagesContext'

export default function useMessages() {
  return useContext(MessagesContext)
}
