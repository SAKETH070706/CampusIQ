import useAuth from '../../hooks/useAuth'
import { useStudentResults } from '../../hooks/useResults'

export default function StudentBacklogPage() {
  const { user }   = useAuth()
  const roll_no    = user?.roll_no

  // /results/{roll_no} returns a plain array of SemesterResult
  const { data, isLoading, error } = useStudentResults(roll_no)

  if (isLoading) {
    return (
      <div className="page-header">
        <h1>⚠️ Backlogs</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return <div className="empty-state"><p>Failed to load backlog data.</p></div>
  }

  // data is a plain array of semesters
  const semesters = Array.isArray(data) ? data : []

  // Build a map keyed by subject_code so we can track all attempts per subject
  const subjectMap = {}
  semesters.forEach(sem => {
    sem.subjects?.forEach(subject => {
      const code = subject.subject_code
      if (!subjectMap[code]) subjectMap[code] = []
      subjectMap[code].push({
        semester:     sem.semester,
        subject_name: subject.subject_name,
        subject_code: subject.subject_code,
        grade:        subject.grade,
        exam_month:   subject.exam_month,
        result:       subject.result,
      })
    })
  })

  const failedSubjects  = []
  const passedSubjects  = []

  Object.values(subjectMap).forEach(attempts => {
    const latest = attempts[attempts.length - 1]
    if (latest.grade === 'F' || latest.result?.toLowerCase() === 'fail') {
      failedSubjects.push({ ...latest, totalAttempts: attempts.length })
    } else {
      passedSubjects.push({ ...latest, totalAttempts: attempts.length })
    }
  })

  return (
    <div>
      <div className="page-header">
        <h1>⚠️ Backlogs & Cleared Subjects</h1>
        <p>Track failed subjects and successfully completed courses</p>
      </div>

      {/* FAILED SUBJECTS */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">❌ Failed Subjects ({failedSubjects.length})</div>
        </div>

        {failedSubjects.length === 0 ? (
          <div className="empty-state">🎉 No backlogs found</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Subject Code</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>Attempts</th>
                </tr>
              </thead>
              <tbody>
                {failedSubjects.map((subject, index) => (
                  <tr key={index} style={{ background: 'rgba(239,68,68,0.04)' }}>
                    <td>{subject.semester}</td>
                    <td className="td-mono">{subject.subject_code}</td>
                    <td style={{ fontWeight: 600, color: 'var(--danger)' }}>{subject.subject_name}</td>
                    <td><span className="badge badge-fail">{subject.grade}</span></td>
                    <td>
                      {/* New: totalAttempts derived from how many times subject appeared across semesters */}
                      <span className={`badge ${subject.totalAttempts >= 3 ? 'badge-fail' : subject.totalAttempts >= 2 ? 'badge-admin' : 'badge-grade'}`}>
                        {subject.totalAttempts} attempt{subject.totalAttempts !== 1 ? 's' : ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CLEARED SUBJECTS */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <div className="card-title">✅ Cleared Subjects ({passedSubjects.length})</div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Subject Code</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Attempts</th>
              </tr>
            </thead>
            <tbody>
              {passedSubjects.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>No cleared subjects</td></tr>
              )}
              {passedSubjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.semester}</td>
                  <td className="td-mono">{subject.subject_code}</td>
                  <td>{subject.subject_name}</td>
                  <td><span className="badge badge-pass">{subject.grade}</span></td>
                  <td>
                    <span className={`badge ${subject.totalAttempts >= 2 ? 'badge-admin' : 'badge-grade'}`}>
                      {subject.totalAttempts} attempt{subject.totalAttempts !== 1 ? 's' : ''}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
