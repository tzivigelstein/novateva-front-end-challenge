import { useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'

export default function useAuth() {
  return useContext(AuthContext)
}
