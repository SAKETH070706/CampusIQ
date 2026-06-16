import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFailures } from '../../hooks/useAnalytics'
import StatCard from '../../components/ui/StatCard'
import SearchBar from '../../components/ui/SearchBar'
import { SkeletonTable } from '../../components/ui/SkeletonLoader'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

// FailureResponse: { roll_no, name, section, failed_subjects:[{semester, subject_name, attempts}] }
export default function FailureAnalyticsPage() {
  const { data: failures = [], isLoading, isError } = useFailures()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = failures.filter(f => {
    const q = search.toLowerCase()
    return !q ||
      (f.name    || '').toLowerCase().includes(q) ||
      (f.roll_no || '').toLowerCase().includes(q) ||
      (f.section || '').toLowerCase().includes(q)
  })

  // Subject failure frequency map (uses subject_name — no subject_code in FailedSubject)
  const subjectFailMap = {}
  failures.forEach(f => {
    f.failed_subjects?.forEach(s => {
      const key = s.subject_name || 'Unknown'
      subjectFailMap[key] = (subjectFailMap[key] || 0) + 1
    })
  })

  const subjectChartData = Object.entries(subjectFailMap)
    .map(([subject, count]) => ({ subject, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const totalBacklogs = failures.reduce((s, f) => s + (f.failed_subjects?.length || 0), 0)

  return (
    <div>
      <div className="page-header">
        <h1>⚠️ Failure Analytics</h1>
        <p>Students with backlogs and subject-wise failure trends</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Students w/ Backlogs" value={failures.length}  icon="👥" color="red" />
        <StatCard label="Total Backlogs"        value={totalBacklogs}    icon="📉" color="red" />
        <StatCard label="Showing"               value={filtered.length}  icon="🔍" color="blue" />
      </div>

      {subjectChartData.length > 0 && (
        <div className="card mb-24" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <div className="card-title">📊 Most Failed Subjects (Top 10)</div>
          </div>
          <div className="chart-container tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} layout="vertical" margin={{ top: 4, right: 20, left: 120, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis type="category" dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} width={115} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="count" name="Fail Count" radius={[0, 4, 4, 0]}>
                  {subjectChartData.map((_, i) => (
                    <Cell key={i} fill={i < 3 ? '#ef4444' : i < 6 ? '#f59e0b' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="card-title">👥 Students with Backlogs</div>
          <div className="filters-bar" style={{ margin: 0 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search name, roll no, section…" />
          </div>
        </div>

        {isLoading && <SkeletonTable rows={6} />}
        {isError   && <div className="error-banner">⚠️ Failed to load failure data.</div>}

        {!isLoading && !isError && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Section</th>
                  <th>Backlogs</th>
                  <th>Failed Subjects</th>
                  <th>Max Attempts</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32 }}>
                      No students found
                    </td>
                  </tr>
                )}
                {filtered.map((f, i) => {
                  const maxAttempts = Math.max(...(f.failed_subjects?.map(s => s.attempts || 1) || [1]))
                  return (
                    <tr key={f.roll_no || i}>
                      <td className="td-mono">{f.roll_no || '—'}</td>
                      <td style={{ fontWeight: 500 }}>{f.name || '—'}</td>
                      <td className="td-mono">{f.section || '—'}</td>
                      <td>
                        <span className="badge badge-fail">
                          {f.failed_subjects?.length ?? '—'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 220 }}>
                        {f.failed_subjects?.map(s => s.subject_name).join(', ') || '—'}
                      </td>
                      <td>
                        {/* New: show attempts field added in the new FailedSubject model */}
                        <span className={`badge ${maxAttempts >= 3 ? 'badge-fail' : maxAttempts >= 2 ? 'badge-admin' : 'badge-grade'}`}>
                          {maxAttempts} attempt{maxAttempts !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/admin/students/${f.roll_no}`)}>
                          View →
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
