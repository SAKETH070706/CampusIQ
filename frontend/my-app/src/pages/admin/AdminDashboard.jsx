import { useTopper, useRankings, useFailures } from '../../hooks/useAnalytics'
import StatCard from '../../components/ui/StatCard'
import TopperCard from '../../components/ui/TopperCard'
import { SkeletonStatGrid, SkeletonCard } from '../../components/ui/SkeletonLoader'
import BranchCompareChart from '../../components/charts/BranchCompareChart'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { data: topper,   isLoading: tLoad } = useTopper()
  // rankings is now a plain array: [{rank,roll_no,name,branch,section,cgpa,sgpa,total_students},...]
  const { data: rankings = [], isLoading: rLoad } = useRankings()
  const { data: failures = [], isLoading: fLoad } = useFailures()
  const navigate = useNavigate()

  // total_students is on each ranking item (same value on all); fall back to array length
  const total    = rankings[0]?.total_students ?? rankings.length
  const avgCgpa  = rankings.length
    ? (rankings.reduce((s, r) => s + (parseFloat(r.cgpa) || 0), 0) / rankings.length).toFixed(2)
    : '—'
  const branches = [...new Set(rankings.map(r => r.branch).filter(Boolean))].length
  const sections = [...new Set(rankings.map(r => r.section).filter(Boolean))].length
  const failCount = failures.length

  // Build branch chart data from rankings array
  const branchMap = {}
  rankings.forEach(r => {
    if (!r.branch) return
    if (!branchMap[r.branch]) branchMap[r.branch] = []
    branchMap[r.branch].push(parseFloat(r.cgpa) || 0)
  })
  const branchData = Object.entries(branchMap).map(([branch, vals]) => ({
    branch,
    avg_cgpa: parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2)),
  }))

  const loading = tLoad || rLoad

  return (
    <div>
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1>📊 Dashboard Overview</h1>
            <p>Real-time academic intelligence for SRKR Engineering College</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/admin/rankings')}>
            View All Rankings →
          </button>
        </div>
      </div>

      {loading ? <SkeletonStatGrid /> : (
        <div className="stat-grid">
          <StatCard label="Total Students"       value={total}     icon="👥" color="blue" />
          <StatCard label="Branches"             value={branches}  icon="🏫" color="purple" />
          <StatCard label="Sections"             value={sections}  icon="📋" color="cyan" />
          <StatCard label="Average CGPA"         value={avgCgpa}   icon="📈" color="green" />
          <StatCard label="Students w/ Backlogs" value={failCount} icon="⚠️" color="red" />
        </div>
      )}

      <div className="mb-24">
        {tLoad
          ? <div className="skeleton" style={{ height: 100, borderRadius: 16 }} />
          : <TopperCard topper={topper} isAdmin />
        }
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">🏫 Branch Performance</div>
              <div className="card-subtitle">Average CGPA by branch</div>
            </div>
          </div>
          {rLoad
            ? <div className="skeleton" style={{ height: 260, borderRadius: 8 }} />
            : <BranchCompareChart data={branchData} />
          }
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">⚠️ Backlog Overview</div>
              <div className="card-subtitle">Students with active backlogs</div>
            </div>
          </div>
          {fLoad
            ? <div className="skeleton" style={{ height: 260, borderRadius: 8 }} />
            : (
              <div style={{ padding: '32px 0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--danger)' }}>
                  {failCount}
                </div>
                <div style={{ color: 'var(--text-muted)', marginTop: 8 }}>Students with active backlogs</div>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 16 }} onClick={() => navigate('/admin/failures')}>
                  View Details →
                </button>
              </div>
            )
          }
        </div>
      </div>

      <div className="mt-24">
        <div className="card-title mb-16" style={{ marginBottom: 16 }}>⚡ Quick Actions</div>
        <div className="grid-3">
          {[
            { label: 'View All Rankings',  desc: 'Sorted by CGPA with filters',   to: '/admin/rankings',  icon: '🏆' },
            { label: 'Branch Analytics',   desc: 'Compare branches head-to-head', to: '/admin/branch',    icon: '🏫' },
            { label: 'Failure Analytics',  desc: 'Students with backlogs',        to: '/admin/failures',  icon: '⚠️' },
          ].map(q => (
            <div key={q.to} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(q.to)}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{q.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{q.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{q.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
