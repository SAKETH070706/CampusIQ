import useAuth from '../../hooks/useAuth'
import { useStudentResults } from '../../hooks/useResults'
import { useStudentByRoll } from '../../hooks/useStudent'
import ProfileCard from '../../components/ui/ProfileCard'
import SGPATrendChart from '../../components/charts/SGPATrendChart'
import CGPATrendChart from '../../components/charts/CGPATrendChart'
import GradeDistributionChart from '../../components/charts/GradeDistributionChart'
import PassFailChart from '../../components/charts/PassFailChart'
import StatCard from '../../components/ui/StatCard'
import { SkeletonCard } from '../../components/ui/SkeletonLoader'
import { useNavigate } from 'react-router-dom'

export default function StudentDashboard() {
  const { user }    = useAuth()
  const navigate    = useNavigate()
  const roll_no     = user?.roll_no

  // BUG #13 FIX: /results/{roll_no} returns plain ARRAY not { semesters:[...] }
  // Previous code: const src = results || student; semesters = src?.semesters
  // results is an array (truthy when has items) → src?.semesters is always undefined
  const { data: resultsArr, isLoading: rLoad } = useStudentResults(roll_no)
  const { data: student,    isLoading: sLoad }  = useStudentByRoll(roll_no)

  // semesters: prefer results array; fall back to student.semesters
  const semesters = (Array.isArray(resultsArr) && resultsArr.length > 0)
    ? resultsArr
    : (student?.semesters || [])

  const allSubjects = semesters.flatMap(s => s.subjects || [])
  const lastSem     = semesters[semesters.length - 1]

  const passCount = allSubjects.filter(s => s.result?.toLowerCase() === 'pass').length
  const failCount = allSubjects.filter(s => s.result?.toLowerCase() === 'fail').length
  const loading   = rLoad || sLoad

  if (!roll_no) {
    return (
      <div className="empty-state">
        <p>No roll number associated with your account. Please contact admin.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1>👤 My Dashboard</h1>
        <p>Your academic performance overview</p>
      </div>

      {loading
        ? <div className="skeleton" style={{ height: 130, borderRadius: 16, marginBottom: 24 }} />
        : <ProfileCard student={student} />   /* ProfileCard needs student_info — use student doc */
      }

      <div className="stat-grid">
        <StatCard label="Current CGPA"    value={lastSem?.cgpa             ?? '—'} icon="📈" color="green" />
        <StatCard label="Latest SGPA"     value={lastSem?.sgpa             ?? '—'} icon="📊" color="blue" />
        <StatCard label="Semesters"       value={semesters.length}                 icon="📅" color="purple" />
        <StatCard label="Subjects Passed" value={passCount}                        icon="✅" color="green" />
        <StatCard label="Backlogs"        value={failCount}                        icon="⚠️" color={failCount > 0 ? 'red' : 'green'} />
        <StatCard label="Credits Secured" value={lastSem?.credits_secured  ?? '—'} icon="🎯" color="cyan" />
      </div>

      {semesters.length > 0 ? (
        <>
          <div className="grid-2 mb-24" style={{ marginBottom: 24 }}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">📈 SGPA Trend</div>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/student/results')}>View Results</button>
              </div>
              {loading
                ? <div className="skeleton" style={{ height: 260, borderRadius: 8 }} />
                : <SGPATrendChart semesters={semesters} />
              }
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">📊 CGPA Progression</div>
              </div>
              {loading
                ? <div className="skeleton" style={{ height: 260, borderRadius: 8 }} />
                : <CGPATrendChart semesters={semesters} />
              }
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <div className="card-title">📚 Grade Distribution</div>
              </div>
              {loading
                ? <div className="skeleton" style={{ height: 260, borderRadius: 8 }} />
                : <GradeDistributionChart subjects={allSubjects} />
              }
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">✅ Pass / Fail Ratio</div>
              </div>
              {loading
                ? <div className="skeleton" style={{ height: 260, borderRadius: 8 }} />
                : <PassFailChart subjects={allSubjects} />
              }
            </div>
          </div>

          {failCount > 0 && (
            <div
              className="card mt-24"
              style={{ marginTop: 24, borderColor: 'rgba(239,68,68,0.3)', cursor: 'pointer' }}
              onClick={() => navigate('/student/backlogs')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--danger)' }}>
                    You have {failCount} backlog{failCount > 1 ? 's' : ''}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Click to view your backlogs and failed subjects
                  </div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>→</span>
              </div>
            </div>
          )}
        </>
      ) : !loading && (
        <div className="empty-state">
          <p>No academic data found for roll number <strong>{roll_no}</strong>. Data may not have been scraped yet.</p>
        </div>
      )}
    </div>
  )
}