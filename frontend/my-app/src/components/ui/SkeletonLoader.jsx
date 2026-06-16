export function SkeletonStatGrid() {
  return (
    <div className="stat-grid">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="stat-card blue" style={{ minHeight: 110 }}>
          <div className="skeleton skeleton-stat" style={{ height: 36, width: 36, borderRadius: 8, marginBottom: 14 }} />
          <div className="skeleton skeleton-stat" style={{ height: 28, width: '60%', marginBottom: 8 }} />
          <div className="skeleton skeleton-text" style={{ width: '80%' }} />
        </div>
      ))}
    </div>
  )
}

export function SkeletonTable({ rows = 6 }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {[...Array(6)].map((_, i) => (
              <th key={i}><div className="skeleton skeleton-text" style={{ width: '70%' }} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, r) => (
            <tr key={r}>
              {[...Array(6)].map((_, c) => (
                <td key={c}><div className="skeleton skeleton-text" style={{ width: `${50 + Math.random() * 40}%` }} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SkeletonCard({ height = 200 }) {
  return (
    <div className="card">
      <div className="skeleton skeleton-title" />
      <div className="skeleton" style={{ height, borderRadius: 8, marginTop: 12 }} />
    </div>
  )
}

export default function SkeletonLoader() {
  return (
    <div>
      <SkeletonStatGrid />
      <SkeletonTable />
    </div>
  )
}