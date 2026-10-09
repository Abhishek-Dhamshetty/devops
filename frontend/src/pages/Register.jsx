import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import '../password.css'

function EyeIcon({ hidden }) {
  return hidden ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9.2 5 9.2 5a16 16 0 0 1-3.1 3.5M6.2 6.2C3.9 7.8 2.8 10 2.8 10s3.7 5 9.2 5c.7 0 1.4-.1 2-.2" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.8 10S6.5 5 12 5s9.2 5 9.2 5-3.7 5-9.2 5-9.2-5-9.2-5Z" /><circle cx="12" cy="10" r="2" /></svg>
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', rollNumber: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function update(key, value) { setForm((current) => ({ ...current, [key]: value })) }

  async function submit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try { await register(form); navigate('/dashboard') } catch (err) { setError(err.response?.data?.message || 'Unable to create your account.') } finally { setBusy(false) }
  }

  return <main className="auth-layout"><div className="auth-aside"><p className="kicker">For every student</p><h1>Turn friction<br />into <em>forward motion.</em></h1><p>Make your report once. Keep your focus on the things that matter.</p></div><form className="form-panel" onSubmit={submit}><div><p className="eyebrow">Student registration</p><h2>Create account</h2><p className="muted">Admin accounts are provisioned separately for security.</p></div>{error && <div className="alert">{error}</div>}<label>Full name<input required value={form.name} onChange={(e) => update('name', e.target.value)} /></label><label>Email<input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} /></label><label>Roll number<input required value={form.rollNumber} onChange={(e) => update('rollNumber', e.target.value)} /></label><div className="form-grid"><label>Password<span className="password-field"><input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => update('password', e.target.value)} /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}><EyeIcon hidden={showPassword} /></button></span></label><label>Confirm password<span className="password-field"><input type={showConfirmPassword ? 'text' : 'password'} required value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} /><button className="password-toggle" type="button" aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'} onClick={() => setShowConfirmPassword((visible) => !visible)}><EyeIcon hidden={showConfirmPassword} /></button></span></label></div><p className="hint">Use 8+ characters with at least 6 letters, a number, and a special character.</p><button className="button button-dark button-full" disabled={busy}>{busy ? 'Creating account...' : 'Create account'} <span>↗</span></button><p className="form-foot">Already registered? <Link to="/login">Sign in</Link></p></form></main>
}
