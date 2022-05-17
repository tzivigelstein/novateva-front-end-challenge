import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

const isWindowDefined = typeof window !== 'undefined'

const localToken = isWindowDefined && window.localStorage.getItem('token')
const token = isWindowDefined ? `Bearer ${localToken}` : ''

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token
  }
})
