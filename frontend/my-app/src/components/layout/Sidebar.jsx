import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const ADMIN_LINKS = [
  { to: '/admin',           label: 'Overview',         icon: '⊞' },
  { to: '/admin/rankings',  label: 'Rankings',         icon: '🏆' },
  { to: '/admin/branch',    label: 'Branch Analytics', icon: '🏫' },
  { to: '/admin/section',   label: 'Section Analytics',icon: '📋' },
  { to: '/admin/subjects',  label: 'Subject Analytics',icon: '📚' },
  { to: '/admin/failures',  label: 'Failure Analytics',icon: '⚠️' },
]

const STUDENT_LINKS = [
  { to: '/student',          label: 'My Dashboard', icon: '⊞' },
  { to: '/student/results',  label: 'My Results',   icon: '📄' },
  { to: '/student/backlogs', label: 'My Backlogs',  icon: '⚠️' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const links = user?.role === 'admin' ? ADMIN_LINKS : STUDENT_LINKS
  const initials = (user?.username || user?.roll_no || 'U').slice(0, 2).toUpperCase()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <div className="brand-icon">🎓</div>
          <span className="brand-name">SRKR</span>
        </div>
        <div className="brand-sub">Analytics System</div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{initials}</div>
        <div>
          <div className="user-name">{user?.username || user?.roll_no || 'User'}</div>
          <div className="user-role">{user?.role}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin' || link.to === '/student'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span style={{ fontSize: '1rem' }}>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  )
}