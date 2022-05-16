import { useContext } from 'react'
import { AppContext } from '../context/app/AppContext'

export default function useApp() {
  return useContext(AppContext)
}
