import { useNavigate } from 'react-router-dom'

// BUG #5 FIX: Backend TopperResponse fields are:
//   roll_no, name, branch, section, sgpa, cgpa
// Previous code tried topper.student_name (wrong) and topper.branch_code (wrong)
export default function TopperCard({ topper, isAdmin = false }) {
  const navigate = useNavigate()
  if (!topper) return null

  // Backend sends 'name' not 'student_name'; 'branch' not 'branch_code'
  const name    = topper.name    || '—'
  const roll    = topper.roll_no || '—'
  const cgpa    = topper.cgpa    ?? '—'
  const branch  = topper.branch  || ''   // fixed: was topper.branch_code
  const section = topper.section || ''
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      className="topper-card"
      style={{ cursor: isAdmin ? 'pointer' : 'default' }}
      onClick={() => isAdmin && roll !== '—' && navigate(`/admin/students/${roll}`)}
    >
      <div className="topper-avatar">{initials}</div>
      <div className="topper-info">
        <div className="label">🏆 College Topper</div>
        <div className="name">{name}</div>
        <div className="meta">{roll}{branch ? ` · ${branch}` : ''}{section ? ` · Sec ${section}` : ''}</div>
      </div>
      <div className="topper-stats">
        <div className="cgpa">{cgpa}</div>
        <div className="cgpa-label">CGPA</div>
      </div>
    </div>
  )
}