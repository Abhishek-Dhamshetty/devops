import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function signOut() { logout(); navigate('/') }
  return <header className="navbar"><Link className="brand" to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/'}><span className="brand-mark">↗</span><span>Campus Voice</span></Link><nav>{user ? <><span className="user-chip">{user.name} · {user.role}</span><button className="button button-ghost" onClick={signOut}>Sign out</button></> : <><Link to="/login">Log in</Link><Link className="button button-dark" to="/register">Join campus</Link></>}</nav></header>
}
