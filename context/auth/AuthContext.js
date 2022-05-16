import { useState, createContext } from 'react'
import axiosClient from '../../config/axiosClient'
import jwtDecode from 'jwt-decode'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  async function signup(userData) {
    setLoading(true)
    return axiosClient.post('/users', userData).finally(() => setLoading(false))
  }

  async function getUserData(userId) {
    setLoading(true)
    return axiosClient(`/users/${userId}`).finally(() => setLoading(false))
  }

  async function login(userData) {
    setLoading(true)

    return axiosClient
      .post('/login', userData)
      .then(data => {
        const token = data.data.authorization

        window.localStorage.setItem('token', token)

        const { userId } = jwtDecode(token)

        return getUserData(userId).then(data => {
          const { user } = data.data
          setUser(user)
          setIsAuth(true)
          window.localStorage.setItem('token', token)
          window.localStorage.setItem('user', JSON.stringify(user))

          return data
        })
      })
      .finally(() => setLoading(false))
  }

  async function postSignupLogin(userData) {
    setLoading(true)

    return axiosClient
      .post('/login', userData)
      .then(data => {
        const token = data.data.authorization

        const newUserData = {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          _id: userData._id
        }

        window.localStorage.setItem('token', token)
        window.localStorage.setItem('user', JSON.stringify(newUserData))

        setUser(newUserData)
        setIsAuth(true)
        return data
      })
      .finally(() => setLoading(false))
  }

  function logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    setUser(null)
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
        user,
        signup,
        login,
        postSignupLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
