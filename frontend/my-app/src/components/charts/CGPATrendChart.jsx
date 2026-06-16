import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 4 }}>Semester {label}</p>
      <p style={{ color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
        CGPA: {payload[0]?.value}
      </p>
    </div>
  )
}

export default function CGPATrendChart({ semesters = [] }) {
  const data = semesters.map(s => ({ sem: s.semester, cgpa: parseFloat(s.cgpa) || 0 }))
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="cgpaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="sem" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} label={{ value: 'Semester', position: 'insideBottom', offset: -2, fill: 'var(--text-muted)', fontSize: 11 }} />
          <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="cgpa" stroke="#10b981" strokeWidth={2.5} fill="url(#cgpaGrad)" dot={{ fill: '#10b981', r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}