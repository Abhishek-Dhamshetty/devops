import { useEffect, useState } from 'react'
import api, { clearSession } from '../services/api'
import { AuthContext } from './context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('complaint_token')))

  useEffect(() => {
    if (!localStorage.getItem('complaint_token')) return
    api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => clearSession()).finally(() => setLoading(false))
  }, [])

  async function login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    localStorage.setItem('complaint_token', data.token)
    setUser(data.user)
    return data.user
  }

  async function register(details) {
    const { data } = await api.post('/auth/register', details)
    localStorage.setItem('complaint_token', data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}
