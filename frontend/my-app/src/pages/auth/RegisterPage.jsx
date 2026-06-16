import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function RegisterPage() {
  const { register, loading } = useAuth()

  // BUG #3 FIX: backend UserRegister requires roll_no, name, email, password, role
  // Previous form only had roll_no and password — missing name and email entirely
  const [form, setForm] = useState({
    roll_no:  '',
    name:     '',
    email:    '',
    password: '',
    role:     'student',
  })

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    register(form)
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

        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Register to access the portal</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Account type selector */}
          <div className="form-group">
            <label className="form-label">Account Type</label>
            <div className="role-selector">
              {['student', 'admin'].map(r => (
                <button
                  key={r}
                  type="button"
                  className={`role-option${form.role === r ? ' selected' : ''}`}
                  onClick={() => set('role', r)}
                >
                  {r === 'student' ? '🎓 Student' : '🛡 Admin'}
                </button>
              ))}
            </div>
          </div>

          {/* Roll No — maps directly to backend roll_no field */}
          <div className="form-group">
            <label className="form-label">Roll Number</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. 20B81A0501"
              value={form.roll_no}
              onChange={e => set('roll_no', e.target.value)}
              required
            />
          </div>

          {/* Name — required by backend */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              required
            />
          </div>

          {/* Email — required by backend (EmailStr) */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              required
            />
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}