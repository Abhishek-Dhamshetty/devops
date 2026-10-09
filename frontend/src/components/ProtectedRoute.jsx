import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth()
  if (loading) return <main className="page-state">Loading your workspace...</main>
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  return <Outlet />
}
