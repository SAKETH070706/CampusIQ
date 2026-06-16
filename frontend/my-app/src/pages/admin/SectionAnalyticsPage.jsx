import { useState } from 'react'
import { useRankings } from '../../hooks/useAnalytics'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import RankingsTable from '../../components/ui/RankingsTable'
import StatCard from '../../components/ui/StatCard'

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444']

export default function SectionAnalyticsPage() {
  // rankings is a plain array
  const { data: rankings = [], isLoading } = useRankings()
  const [selectedSection, setSelectedSection] = useState('')
  const [branchFilter,    setBranchFilter]    = useState('')

  const branches = [...new Set(rankings.map(r => r.branch).filter(Boolean))]
  const filtered  = branchFilter ? rankings.filter(r => r.branch === branchFilter) : rankings
  const sections  = [...new Set(filtered.map(r => r.section).filter(Boolean))]

  const sectionMap = {}
  filtered.forEach(r => {
    if (!r.section) return
    if (!sectionMap[r.section]) sectionMap[r.section] = []
    sectionMap[r.section].push(r)
  })

  const sectionChartData = Object.entries(sectionMap).map(([sec, students]) => ({
    section: sec,
    avg_cgpa: parseFloat((students.reduce((s, r) => s + (parseFloat(r.cgpa) || 0), 0) / students.length).toFixed(2)),
    count: students.length,
  })).sort((a, b) => b.avg_cgpa - a.avg_cgpa)

  const secStudents = selectedSection ? (sectionMap[selectedSection] || []) : []

  return (
    <div>
      <div className="page-header">
        <h1>📋 Section Analytics</h1>
        <p>Compare sections and drill into individual section performance</p>
      </div>

      <div className="filters-bar">
        <select
          className="filter-select"
          value={branchFilter}
          onChange={e => { setBranchFilter(e.target.value); setSelectedSection('') }}
        >
          <option value="">All Branches</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Sections" value={sections.length}  icon="📋" color="cyan" />
        <StatCard label="Total Students" value={filtered.length}  icon="👥" color="blue" />
      </div>

      <div className="card mb-24" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="card-title">📊 Average CGPA by Section</div>
        </div>
        {isLoading
          ? <div className="skeleton" style={{ height: 260, borderRadius: 8 }} />
          : (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionChartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="section" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <YAxis domain={[0, 10]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  />
                  <Bar dataKey="avg_cgpa" name="Avg CGPA" radius={[4, 4, 0, 0]}>
                    {sectionChartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        }
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">🔍 Section Drill-Down</div>
          <select className="filter-select" value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
          </select>
        </div>

        {selectedSection ? (
          <>
            <div className="stat-grid mt-16" style={{ marginTop: 16 }}>
              <StatCard label="Students" value={secStudents.length} icon="👥" color="blue" />
              <StatCard
                label="Avg CGPA"
                value={secStudents.length
                  ? (secStudents.reduce((s, r) => s + (parseFloat(r.cgpa) || 0), 0) / secStudents.length).toFixed(2)
                  : '—'}
                icon="📈" color="green"
              />
            </div>
            <div className="card mt-16" style={{ marginTop: 16 }}>
              <div className="card-title mb-16" style={{ marginBottom: 12 }}>Section Toppers</div>
              <RankingsTable data={secStudents} isAdmin />
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>Select a section to see detailed analytics</p>
          </div>
        )}
      </div>
    </div>
  )
}
