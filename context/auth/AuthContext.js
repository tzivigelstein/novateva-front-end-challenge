import { useState, createContext } from 'react'
import axiosClient from '../../config/axiosClient'
import jwtDecode from 'jwt-decode'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)

  async function signup(userData) {
    return axiosClient.post('/users', userData)
  }

  async function getUserData(userId) {
    return axiosClient(`/users/${userId}`)
  }

  async function login(userData) {
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
  }

  async function postSignupLogin(userData) {
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
