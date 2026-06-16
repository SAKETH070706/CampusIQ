export default function Badge({ result }) {
  if (!result) return <span className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>—</span>
  const passed = result.toLowerCase() === 'pass'
  return (
    <span className={`badge ${passed ? 'badge-pass' : 'badge-fail'}`}>
      {passed ? '✓ Pass' : '✗ Fail'}
    </span>
  )
}