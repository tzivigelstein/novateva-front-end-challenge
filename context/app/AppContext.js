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
  const [activeConversation, setActiveConversation] = useState(null)
  const [reports, setReports] = useState([])

  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

  function connectToSocket(id) {
    const socket = io(SOCKET_URL, {
      query: {
        roomId: id
      }
    })

    socket.on('connect', () => {
      setOpenSockets(prev => [...prev, socket])
    })

    socket.on('disconnect', () => {
      console.info('Socket disconnected')
    })

    socket.on('new message', function ({ message }) {
      setCurrentConversation(prev => {
        if (prev?.id === message.chatRoomId) {
          return { ...prev, messages: [...prev.messages, message] }
        } else {
          return prev
        }
      })

      setChats(prev => {
        return prev.map(chat => {
          if (chat.id === message.chatRoomId) {
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
    return axiosClient.put(`/room/${id}/mark-read`).finally(() => {
      const newConversation = getNewReadConversation(currentConversation)

      setCurrentConversation(newConversation)
      setChats(prev =>
        prev.map(chat => {
          if (chat.id === id) {
            return { ...newConversation }
          }

          return chat
        })
      )
    })
  }

  function getNewReadConversation(conversation) {
    const { messages } = conversation

    const newMessages = messages.map(message => {
      const flatReadByRecipients = message.readByRecipients.map(({ readByUserId }) => readByUserId)

      const messageNotRead = !flatReadByRecipients.includes(localUser.id)

      const newReadByRecipients = [...message.readByRecipients]

      if (messageNotRead) {
        newReadByRecipients.push({ readByUserId: localUser.id })
      }

      return {
        ...message,
        readByRecipients: [...newReadByRecipients]
      }
    })

    const newConversation = {
      ...conversation,
      messages: [...newMessages]
    }

    return newConversation
  }

  async function getAllUsers() {
    return axiosClient.get('/users').then(data => {
      const { users } = data.data
      setAllUsers(() => users.filter(user => user.id !== localUser.id))

      return data
    })
  }

  async function getAllChats() {
    return axiosClient('/room').then(data => {
      const { conversation: conversations } = data.data
      setChats(conversations)

      return data
    })
  }

  async function deleteMessage(id) {
    return axiosClient.delete(`/delete/message/${id}`).then(() => {
      setCurrentConversation(prev => ({ ...prev, messages: prev.messages.filter(message => message.id !== id) }))
      setChats(prev =>
        prev.map(chat => {
          if (chat.id === currentConversation.id) {
            return { ...chat, messages: chat.messages.filter(message => message.id !== id) }
          }

          return chat
        })
      )
    })
  }

  function setCurrentConversationId(id) {
    setCurrentConversation(() => chats.find(chat => chat.id === id))
  }

  async function postMessage(message) {
    return axiosClient.post(`/room/${currentConversation.id}/message`, message)
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

  function getUnreadMessagesCount(chat) {
    if (typeof chat === 'undefined') return 0

    const count = chat?.messages?.reduce((acc, message) => {
      if (!message.readByRecipients.find(recipient => recipient.readByUserId === localUser.id)) {
        return acc + 1
      }

      return acc
    }, 0)

    return count
  }

  function getAllUnreadNotifications() {
    const totalCount = chats.reduce((acc, el) => {
      const count = getUnreadMessagesCount(el)

      return acc + count
    }, 0)

    return totalCount
  }

  async function deleteConversation(id) {
    return axiosClient.delete(`/delete/room/${id}`).then(() => {
      setChats(prev => prev.filter(chat => chat.id !== id))
      setCurrentConversation(prev => {
        if (prev && prev.id === id) {
          return null
        }

        return prev
      })
    })
  }

  function updateActiveConversation(conversation) {
    setActiveConversation(conversation)
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
        activeConversation,
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
        getReports,
        getUnreadMessagesCount,
        getAllUnreadNotifications,
        deleteConversation,
        updateActiveConversation
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
