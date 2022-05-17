import { useState, createContext } from 'react'
import axiosClient from '../../config/axiosClient'
import { io } from 'socket.io-client'
import useAuth from '../../hooks/useAuth'

export const AppContext = createContext()

export default function AppProvider({ children }) {
  const { user: localUser } = useAuth()

  const [messages, setMessages] = useState([])
  const [participants, setParticipants] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [chats, setChats] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const [openSockets, setOpenSockets] = useState([])
  const [activeMessage, setActiveMessage] = useState(null)
  const [reports, setReports] = useState([])
  const [notifications, setNotifications] = useState([])

  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

  function connectToSocket(id) {
    const socket = io(SOCKET_URL, {
      query: {
        roomId: id
      }
    })

    socket.on('connect', () => {
      console.log('Connected to', socket.id)

      setOpenSockets(prev => [...prev, socket])
    })

    socket.on('disconnect', () => {
      console.log('Disconnecting')
    })

    socket.on('new message', function ({ message }) {
      if (currentConversation?._id === message.chatRoomId) {
        console.log('updating current conver')
        setCurrentConversation(prev => ({ ...prev, messages: [...prev.messages, message] }))
      }

      setChats(prev => {
        return prev.map(chat => {
          if (chat._id === message.chatRoomId) {
            return { ...chat, messages: [...chat.messages, message] }
          }

          return { ...chat }
        })
      })
    })

    socket.on('connect_error', error => console.error(error))
    socket.on('connect_failed', error => console.error(error))

    return socket
  }

  async function markAsRead(id) {
    return axiosClient.put(`/room/${id}/mark-read`).then(() => {
      setCurrentConversation(prev => ({
        ...prev,
        messages: prev.messages
          .filter(message => message.readByRecipients.find(recipient => recipient.userId !== localUser._id))
          .map(message => ({
            ...message,
            readByRecipients: [...message.readByRecipients, localUser._id]
          }))
      }))
    })
  }

  async function getAllUsers() {
    return axiosClient.get('/users').then(data => {
      const { users } = data.data
      setAllUsers(users)

      return data
    })
  }

  async function getAllChats() {
    return axiosClient('/room').then(data => {
      const { conversation: conversations } = data.data
      setChats(conversations)
    })
  }

  async function deleteMessage(id) {
    return axiosClient.delete(`/delete/message/${id}`).then(() => {
      setCurrentConversation(prev => ({ ...prev, messages: prev.messages.filter(message => message._id !== id) }))
      setChats(prev =>
        prev.map(chat => {
          if (chat._id === currentConversation._id) {
            return { ...chat, messages: chat.messages.filter(message => message._id !== id) }
          }

          return chat
        })
      )
    })
  }

  function setCurrentConversationId(id) {
    setCurrentConversation(() => chats.find(chat => chat._id === id))
  }

  async function postMessage(message) {
    return axiosClient.post(`/room/${currentConversation._id}/message`, message)
  }

  async function getRoomMessages(room) {
    return axiosClient(`/room/${room}`)
      .then(res => {
        const { users, conversation } = res.data

        setParticipants(users)
        setMessages(conversation)
      })
      .catch(console.error)
  }

  async function createNewChat(participants) {
    return axiosClient
      .post('/room/initiate', { userIds: participants, type: 'consumer-to-consumer' })
      .catch(console.error)
  }

  function setSelectedUser(id) {
    setSelectedUserId(id)
  }

  function setNewActiveMessage(message) {
    setActiveMessage(message)
  }

  async function getReports() {
    return axiosClient
      .get('/complaints')
      .then(({ data }) => {
        const { complaints } = data
        setReports(complaints)

        return data
      })
      .catch(console.error)
  }

  return (
    <AppContext.Provider
      value={{
        messages,
        participants,
        users: allUsers,
        selectedUserId,
        chats,
        currentConversation,
        openSockets,
        activeMessage,
        reports,
        setSelectedUser,
        getRoomMessages,
        createNewChat,
        getAllUsers,
        getAllChats,
        postMessage,
        setCurrentConversationId,
        connectToSocket,
        deleteMessage,
        markAsRead,
        setNewActiveMessage,
        getReports
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
