import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const GRADE_COLORS = { O: '#10b981', 'A+': '#3b82f6', A: '#6366f1', 'B+': '#8b5cf6', B: '#f59e0b', C: '#f97316', F: '#ef4444', Ab: '#6b7280' }

export default function GradeDistributionChart({ subjects = [] }) {
  const counts = {}
  subjects.forEach(s => { const g = s.grade || 'Unknown'; counts[g] = (counts[g] || 0) + 1 })
  const data = Object.entries(counts).map(([grade, count]) => ({ grade, count }))

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="grade" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={GRADE_COLORS[entry.grade] || '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}