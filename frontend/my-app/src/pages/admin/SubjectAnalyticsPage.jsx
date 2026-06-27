import { useState } from 'react'
import { useSubjectStats } from '../../hooks/useAnalytics'
import GradeDistributionChart from '../../components/charts/GradeDistributionChart'
import StatCard from '../../components/ui/StatCard'
import SearchBar from '../../components/ui/SearchBar'
import { SkeletonCard } from '../../components/ui/SkeletonLoader'

function SubjectDetail({ subject_code }) {
  const { data, isLoading, isError } = useSubjectStats(subject_code)

  const [branchFilter, setBranchFilter] = useState('')
  const [sectionFilter, setSectionFilter] = useState('')

  if (isLoading) return <SkeletonCard height={200} />
  if (isError || !data)
    return <div className="error-banner">⚠️ Could not load subject data.</div>

  const stats = data.statistics || []

  const branches = [...new Set(stats.map(s => s.branch).filter(Boolean))]
  const sections = [...new Set(stats.map(s => s.section).filter(Boolean))]

  const filtered = stats.filter(s => {
    if (branchFilter && s.branch !== branchFilter) return false
    if (sectionFilter && s.section !== sectionFilter) return false
    return true
  })

  const total = filtered.length

  const passCount = filtered.filter(
    s => s.grade && s.grade !== 'F' && s.grade !== 'Ab'
  ).length

  const failCount = filtered.filter(
    s => s.grade === 'F' || s.grade === 'Ab'
  ).length

  const passPercent = total
    ? ((passCount / total) * 100).toFixed(1)
    : '—'

  const subjectsForChart = filtered.map(s => ({
    grade: s.grade,
  }))

  return (
    <>
      

      <div className="stat-grid mt-16">
        <StatCard
          label="Total Students"
          value={total}
          icon="👥"
          color="blue"
        />
        <StatCard
          label="Pass %"
          value={`${passPercent}%`}
          icon="✅"
          color="green"
        />
        <StatCard
          label="Pass Count"
          value={passCount}
          icon="✓"
          color="green"
        />
        <StatCard
          label="Fail Count"
          value={failCount}
          icon="⚠️"
          color="red"
        />
      </div>

      <div className="grid-2 mt-16">
        <div className="card">
          <div className="card-title mb-16">
            Grade Distribution
          </div>

          <GradeDistributionChart
            subjects={subjectsForChart}
          />
        </div>

        <div className="card">
          <div className="card-title mb-16">
            Student Grades
          </div>

          <div
            className="table-wrapper"
            style={{
              maxHeight: 320,
              overflowY: 'auto',
            }}
          >

          <div
        className="filters-bar"
        style={{ marginBottom: 20 }}
      >
        <select
          className="filter-select"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
        >
          <option value="">All Branches</option>
          {branches.map(branch => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
        >
          <option value="">All Sections</option>
          {sections.map(section => (
            <option key={section} value={section}>
              Section {section}
            </option>
          ))}
        </select>

        {(branchFilter || sectionFilter) && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setBranchFilter('')
              setSectionFilter('')
            }}
          >
            Clear
          </button>
        )}
      </div>

            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Section</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((s, i) => {
                  const failed =
                    s.grade === 'F' ||
                    s.grade === 'Ab'

                  return (
                    <tr
                      key={i}
                      style={
                        failed
                          ? {
                              background:
                                'rgba(239,68,68,0.04)',
                            }
                          : {}
                      }
                    >
                      <td className="td-mono">
                        {s.roll_no}
                      </td>

                      <td>{s.name}</td>

                      <td>{s.branch}</td>

                      <td>{s.section}</td>

                      <td>
                        <span
                          className={`badge ${
                            failed
                              ? 'badge-fail'
                              : 'badge-grade'
                          }`}
                        >
                          {s.grade}
                        </span>
                      </td>
                    </tr>
                  )
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: 'center',
                        padding: 25,
                      }}
                    >
                      No students found.
                    </td>
                  </tr>
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