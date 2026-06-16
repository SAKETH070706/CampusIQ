import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const BRANCH_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4']

export default function BranchCompareChart({ data = [] }) {
  if (!data.length) return <div className="empty-state"><p>No branch data</p></div>
  return (
    <div className="chart-container tall">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="branch" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} angle={-20} textAnchor="end" />
          <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} label={{ value: 'Avg CGPA', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="avg_cgpa" name="Avg CGPA" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={BRANCH_COLORS[i % BRANCH_COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}