import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api' })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('complaint_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function clearSession() {
  localStorage.removeItem('complaint_token')
}

export default api
