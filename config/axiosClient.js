import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

const isWindowDefined = typeof window !== 'undefined'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: isWindowDefined ? `Bearer ${window.localStorage.getItem('token')}` : ''
  }
})
