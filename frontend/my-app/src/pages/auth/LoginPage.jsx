import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function LoginPage() {
  const { login, loading } = useAuth()
    const [form, setForm] = useState({
  roll_no: '',
  password: ''
})
  const handleSubmit = (e) => {
    e.preventDefault()
    login(form)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg-circle c1" />
      <div className="auth-bg-circle c2" />
      <div className="auth-box">
        <div className="auth-logo">
          <div className="logo-icon">🎓</div>
          <div>
            <div className="logo-text">SRKR Analytics</div>
            <div className="logo-sub">Student Results Intelligence</div>
          </div>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to access your dashboard</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username / Roll No</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter username or roll number"
              value={form.roll_no}
              onChange={e => setForm(p => ({ ...p, roll_no: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  )
}