import Badge from './Badge'

export default function SubjectTable({ subjects = [] }) {
  if (!subjects.length) return <p className="text-muted" style={{ padding: '12px 0' }}>No subjects found.</p>

  return (
    <div className="table-wrapper" style={{ marginTop: 12 }}>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Subject</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>Exam Month</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub, i) => {
            const failed = sub.result?.toLowerCase() === 'fail' || sub.grade === 'F'
            return (
              <tr key={i} style={failed ? { background: 'rgba(239,68,68,0.04)' } : {}}>
                <td className="td-mono">{sub.subject_code || '—'}</td>
                <td style={{ fontWeight: failed ? 600 : 400, color: failed ? 'var(--danger)' : 'var(--text-primary)' }}>
                  {sub.subject_name || '—'}
                </td>
                <td className="td-mono">{sub.credits ?? '—'}</td>
                <td>
                  <span className={`badge ${sub.grade === 'F' || sub.grade === 'Ab' ? 'badge-fail' : 'badge-grade'}`}>
                    {sub.grade || '—'}
                  </span>
                </td>
                <td className="td-mono" style={{ fontSize: '0.78rem' }}>{sub.exam_month || '—'}</td>
                <td><Badge result={sub.result} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}