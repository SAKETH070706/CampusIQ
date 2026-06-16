import useAuth from '../../hooks/useAuth'

export default function Topbar({ title }) {
  const { user } = useAuth()
  return (
    <header className="topbar">
      <span className="topbar-title">{title}</span>
      <div className="topbar-right">
        <span className={`badge ${user?.role === 'admin' ? 'badge-admin' : 'badge-student'}`}>
          {user?.role?.toUpperCase()}
        </span>
        <span className="topbar-badge">SRKR v1.0</span>
      </div>
    </header>
  )
}