import { useState } from 'react'
import { useSubjectStats } from '../../hooks/useAnalytics'
import GradeDistributionChart from '../../components/charts/GradeDistributionChart'
import StatCard from '../../components/ui/StatCard'
import SearchBar from '../../components/ui/SearchBar'
import { SkeletonCard } from '../../components/ui/SkeletonLoader'

// BUG #10 FIX: Backend /analytics/subject/{sub_code} returns:
//   { sub_code, statistics: [{roll_no, name, section, grade}] }
// Previous code read data.students — that field does NOT exist.
// Correct field is data.statistics.
// Also SubjectStat has: roll_no, name, section, grade — NO result/pass/fail field,
// NO subject_code/subject_name nested inside.
function SubjectDetail({ subject_code }) {
  const { data, isLoading, isError } = useSubjectStats(subject_code)
  if (isLoading) return <SkeletonCard height={200} />
  if (isError || !data) return <div className="error-banner">⚠️ Could not load subject data.</div>

  // BUG #10 FIX: use data.statistics not data.students
  const stats = data.statistics || []
  const total = stats.length

  // SubjectStat has 'grade' only — no 'result' field in this response
  // Count pass by grade !== 'F' and grade !== 'Ab'
  const passCount = stats.filter(s => s.grade && s.grade !== 'F' && s.grade !== 'Ab').length
  const failCount = stats.filter(s => s.grade === 'F' || s.grade === 'Ab').length
  const passPercent = total ? ((passCount / total) * 100).toFixed(1) : '—'

  // Build subjects array compatible with GradeDistributionChart (needs .grade)
  const subjectsForChart = stats.map(s => ({ grade: s.grade }))

  return (
    <>
      <div className="stat-grid mt-16" style={{ marginTop: 16 }}>
        <StatCard label="Total Students" value={total}            icon="👥" color="blue" />
        <StatCard label="Pass %"         value={`${passPercent}%`} icon="✅" color="green" />
        <StatCard label="Pass Count"     value={passCount}        icon="✓"  color="green" />
        <StatCard label="Fail Count"     value={failCount}        icon="⚠️" color="red" />
      </div>

      <div className="grid-2 mt-16" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="card-title mb-16" style={{ marginBottom: 12 }}>Grade Distribution</div>
          <GradeDistributionChart subjects={subjectsForChart} />
        </div>
        <div className="card">
          <div className="card-title mb-16" style={{ marginBottom: 12 }}>Student Grades</div>
          <div className="table-wrapper" style={{ maxHeight: 280, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Section</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s, i) => {
                  const failed = s.grade === 'F' || s.grade === 'Ab'
                  return (
                    <tr key={i} style={failed ? { background: 'rgba(239,68,68,0.04)' } : {}}>
                      <td className="td-mono">{s.roll_no || '—'}</td>
                      <td>{s.name || '—'}</td>       {/* BUG #10 FIX: field is 'name' not 'student_name' */}
                      <td className="td-mono">{s.section || '—'}</td>
                      <td>
                        <span className={`badge ${failed ? 'badge-fail' : 'badge-grade'}`}>
                          {s.grade || '—'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {stats.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>No data</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default function SubjectAnalyticsPage() {
  const [subjectCode, setSubjectCode] = useState('')
  const [search, setSearch] = useState('')

  // BUG #11 FIX: Rankings API does NOT include .subjects on each student.
  // RankingResponse only has: rank, roll_no, name, branch, section, cgpa, sgpa.
  // Subject list cannot be built from rankings.
  // Solution: allow the admin to type a subject code directly.
  const handleSearch = (val) => {
    setSearch(val)
    // Reset selected subject when typing a new search
    if (subjectCode && !val.toLowerCase().includes(subjectCode.toLowerCase())) {
      setSubjectCode('')
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>📚 Subject Analytics</h1>
        <p>Grade distribution, pass/fail ratios, and student performance per subject</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">🔍 Enter Subject Code</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Type subject code e.g. CS301…"
            style={{ flex: 1, minWidth: 220 }}
          />
          <button
            className="btn btn-primary"
            onClick={() => { if (search.trim()) setSubjectCode(search.trim().toUpperCase()) }}
            disabled={!search.trim()}
          >
            Load Subject
          </button>
          {subjectCode && (
            <button className="btn btn-ghost" onClick={() => { setSubjectCode(''); setSearch('') }}>
              Clear
            </button>
          )}
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 10 }}>
          Enter the exact subject code as used in the system (e.g. CS301, MA101). Case insensitive.
        </p>
      </div>

      {subjectCode && (
        <div className="mt-24" style={{ marginTop: 24 }}>
          <div className="card-header" style={{ marginBottom: 16 }}>
            <div className="card-title">📊 Results for: {subjectCode}</div>
          </div>
          <SubjectDetail subject_code={subjectCode} />
        </div>
      )}

      {!subjectCode && (
        <div className="empty-state mt-24" style={{ marginTop: 24 }}>
          <p>Enter a subject code above and click "Load Subject" to view analytics</p>
        </div>
      )}
    </div>
  )
}