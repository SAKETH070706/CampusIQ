import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 4 }}>Semester {label}</p>
      <p style={{ color: '#3b82f6', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
        SGPA: {payload[0]?.value}
      </p>
    </div>
  )
}

export default function SGPATrendChart({ semesters = [] }) {
  const data = semesters.map(s => ({ sem: s.semester, sgpa: parseFloat(s.sgpa) || 0 }))
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="sem" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} label={{ value: 'Semester', position: 'insideBottom', offset: -2, fill: 'var(--text-muted)', fontSize: 11 }} />
          <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={7} stroke="var(--warning)" strokeDasharray="4 4" label={{ value: '7.0', fill: 'var(--warning)', fontSize: 11 }} />
          <Line type="monotone" dataKey="sgpa" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}