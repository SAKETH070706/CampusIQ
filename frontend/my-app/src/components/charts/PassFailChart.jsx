import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#10b981', '#ef4444']

export default function PassFailChart({ subjects = [] }) {
  const pass = subjects.filter(s => s.result?.toLowerCase() === 'pass').length
  const fail = subjects.filter(s => s.result?.toLowerCase() === 'fail').length
  const data = [
    { name: 'Pass', value: pass },
    { name: 'Fail', value: fail },
  ].filter(d => d.value > 0)

  if (!data.length) return <div className="empty-state"><p>No result data</p></div>

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip
            contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
            formatter={(val, name) => [`${val} subjects`, name]}
          />
          <Legend iconType="circle" iconSize={10} wrapperStyle={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}