import { useState } from 'react'
import { useRankings,useMeritRankings } from '../../hooks/useAnalytics'
import RankingsTable from '../../components/ui/RankingsTable'
import { SkeletonTable } from '../../components/ui/SkeletonLoader'
import StatCard from '../../components/ui/StatCard'


export default function RankingsPage() {
  
  const [branchFilter,  setBranchFilter]  = useState('')
  const [sectionFilter, setSectionFilter] = useState('')
  const [rankingType, setRankingType] = useState('official')
  const official = useRankings(rankingType === 'official')
  const merit = useMeritRankings(rankingType === 'merit')
  

  const {data: rankings = [], isLoading, isError} = rankingType === 'official'? official: merit
  
  const totalStudents = rankings[0]?.total_students ?? rankings.length

  const branches = [...new Set(rankings.map(r => r.branch).filter(Boolean))]
  const sections  = [...new Set(rankings.map(r => r.section).filter(Boolean))]

  const filtered = rankings.filter(r => {
    if (branchFilter  && r.branch  !== branchFilter)  return false
    if (sectionFilter && r.section !== sectionFilter) return false
    return true
  })

  const avgCgpa = filtered.length
    ? (filtered.reduce((s, r) => s + (parseFloat(r.cgpa) || 0), 0) / filtered.length).toFixed(2)
    : '—'

  return (
    <div>
      <div className="page-header">
        <h1>🏆 Global Rankings</h1>
        <p>All students ranked by CGPA — click column headers to sort</p>
      </div>

      <div className="stat-grid" style={{ marginBottom: 20 }}>
        <StatCard label="Total Students" value={totalStudents}    icon="👥" color="blue" />
        <StatCard label="Showing"        value={filtered.length}  icon="🔍" color="cyan" />
        <StatCard label="Avg CGPA"       value={avgCgpa}          icon="📈" color="green" />
        <StatCard label="Branches"       value={branches.length}  icon="🏫" color="purple" />
        <StatCard label="Sections"       value={sections.length}  icon="📋" color="cyan" />
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{rankingType === 'official' ? '📋 Official Rankings': '🏅 Merit Rankings'}</div>
          <div className="filters-bar" style={{ margin: 0 }}>
            <select className="filter-select" value={branchFilter} onChange={e => setBranchFilter(e.target.value)}>
              <option value="">All Branches</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select className="filter-select" value={sectionFilter} onChange={e => setSectionFilter(e.target.value)}>
              <option value="">All Sections</option>
              {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>
            <select className="filter-select" value={rankingType} onChange={(e) => setRankingType(e.target.value)}>
                  <option value="official">Official Ranking</option>
                  <option value="merit">Merit Ranking</option>
            </select>
            {(branchFilter || sectionFilter || rankingType ) && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setBranchFilter(''); setSectionFilter(''); setRankingType('');}}>
                Clear
              </button>
            )}
          </div>
        </div>

        {isLoading && <SkeletonTable rows={8} />}
        {isError   && <div className="error-banner">⚠️ Failed to load rankings. Please try again.</div>}
        {!isLoading && !isError && <RankingsTable data={filtered} isAdmin showAttempts={rankingType === "merit"} />}
      </div>
    </div>
  )
}
