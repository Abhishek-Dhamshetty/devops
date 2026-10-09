import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import '../password.css'

function EyeIcon({ hidden }) {
  return hidden ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9.2 5 9.2 5a16 16 0 0 1-3.1 3.5M6.2 6.2C3.9 7.8 2.8 10 2.8 10s3.7 5 9.2 5c.7 0 1.4-.1 2-.2" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.8 10S6.5 5 12 5s9.2 5 9.2 5-3.7 5-9.2 5-9.2-5-9.2-5Z" /><circle cx="12" cy="10" r="2" /></svg>
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try { const user = await login(form); navigate(user.role === 'admin' ? '/admin' : '/dashboard') } catch (err) { setError(err.response?.data?.message || 'Unable to sign in right now.') } finally { setBusy(false) }
  }

  return <main className="auth-layout"><div className="auth-aside"><p className="kicker">Welcome back</p><h1>Your campus,<br /><em>in conversation.</em></h1><p>Sign in to follow your reports or help move the queue forward.</p></div><form className="form-panel" onSubmit={submit}><div><p className="eyebrow">Account access</p><h2>Sign in</h2><p className="muted">Use your campus email and password.</p></div>{error && <div className="alert">{error}</div>}<label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Password<span className="password-field"><input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}><EyeIcon hidden={showPassword} /></button></span></label><button className="button button-dark button-full" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'} <span>↗</span></button><p className="form-foot">New here? <Link to="/register">Create a student account</Link></p></form></main>
}
