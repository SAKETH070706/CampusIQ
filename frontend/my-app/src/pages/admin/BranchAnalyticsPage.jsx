import { useState } from 'react'
import { useRankings, useBranchAverage } from '../../hooks/useAnalytics'
import BranchCompareChart from '../../components/charts/BranchCompareChart'
import RankingsTable from '../../components/ui/RankingsTable'
import StatCard from '../../components/ui/StatCard'
import { SkeletonCard } from '../../components/ui/SkeletonLoader'

function BranchDetail({ branch, studentCount }) {
  const { data, isLoading } = useBranchAverage(branch)
  if (isLoading) return <SkeletonCard height={80} />
  if (!data) return null
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div className="card-header">
        <div className="card-title">🏫 {branch} — Detailed Stats</div>
      </div>
      <div className="stat-grid">
        <StatCard
          label="Avg CGPA"
          value={data.average_cgpa != null ? parseFloat(data.average_cgpa).toFixed(2) : '—'}
          icon="📈" color="green"
        />
        <StatCard label="Students in Branch" value={studentCount ?? '—'} icon="👥" color="blue" />
      </div>
    </div>
  )
}

export default function BranchAnalyticsPage() {
  // rankings is a plain array now
  const { data: rankings = [], isLoading } = useRankings()
  const [selectedBranch, setSelectedBranch] = useState('')

  const branches = [...new Set(rankings.map(r => r.branch).filter(Boolean))]

  const branchMap = {}
  rankings.forEach(r => {
    if (!r.branch) return
    if (!branchMap[r.branch]) branchMap[r.branch] = []
    branchMap[r.branch].push(r)
  })

  const branchChartData = Object.entries(branchMap).map(([branch, students]) => ({
    branch,
    avg_cgpa: parseFloat((students.reduce((s, r) => s + (parseFloat(r.cgpa) || 0), 0) / students.length).toFixed(2)),
  }))

  const branchStudents = selectedBranch ? (branchMap[selectedBranch] || []) : []

  return (
    <div>
      <div className="page-header">
        <h1>🏫 Branch Analytics</h1>
        <p>Compare academic performance across all branches</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Branches" value={branches.length} icon="🏫" color="purple" />
        <StatCard label="Total Students" value={rankings[0]?.total_students ?? rankings.length} icon="👥" color="blue" />
      </div>

      <div className="card mb-24" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="card-title">📊 Average CGPA by Branch</div>
        </div>
        {isLoading
          ? <div className="skeleton" style={{ height: 340, borderRadius: 8 }} />
          : <BranchCompareChart data={branchChartData} />
        }
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">🔍 Branch Drill-Down</div>
          <select className="filter-select" value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}>
            <option value="">Select Branch</option>
            {branches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {selectedBranch ? (
          <>
            <BranchDetail branch={selectedBranch} studentCount={branchStudents.length} />
            <div className="card mt-16" style={{ marginTop: 16 }}>
              <div className="card-title mb-16" style={{ marginBottom: 12 }}>Top Students in {selectedBranch}</div>
              <RankingsTable data={branchStudents} isAdmin />
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>Select a branch above to see detailed analytics and student list</p>
          </div>
        )}
      </div>
    </div>
  )
}
