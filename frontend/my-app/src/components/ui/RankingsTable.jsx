import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

function RankBadge({ rank }) {
  const cls = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : ''
  return <span className={`rank-badge ${cls}`}>{rank}</span>
}

export default function RankingsTable({ data = [], isAdmin = false }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('rank')
  const [sortDir, setSortDir] = useState('asc')

  const toggle = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const arrow = (key) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  const filtered = data
    .filter(s => {
      const q = search.toLowerCase()
      return (
        (s.name || '').toLowerCase().includes(q) ||
        (s.roll_no || '').toLowerCase().includes(q) ||
        (s.branch || '').toLowerCase().includes(q) ||
        (s.section || '').toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      let av = a[sortKey] ?? 0
      let bv = b[sortKey] ?? 0
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })

  return (
    <>
      <div className="filters-bar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search name, roll no, branch…" />
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => toggle('rank')} style={{ cursor: 'pointer' }}>Rank{arrow('rank')}</th>
              <th onClick={() => toggle('roll_no')} style={{ cursor: 'pointer' }}>Roll No{arrow('roll_no')}</th>
              <th onClick={() => toggle('name')} style={{ cursor: 'pointer' }}>Name{arrow('name')}</th>
              <th onClick={() => toggle('branch')} style={{ cursor: 'pointer' }}>Branch{arrow('branch')}</th>
              <th onClick={() => toggle('section')} style={{ cursor: 'pointer' }}>Section{arrow('section')}</th>
              <th onClick={() => toggle('sgpa')} style={{ cursor: 'pointer' }}>SGPA{arrow('sgpa')}</th>
              <th onClick={() => toggle('cgpa')} style={{ cursor: 'pointer' }}>CGPA{arrow('cgpa')}</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={isAdmin ? 8 : 7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32 }}>No results found</td></tr>
            )}
            {filtered.map((s, i) => (
              <tr key={s.roll_no || i}>
                <td><RankBadge rank={s.rank || i + 1} /></td>
                <td className="td-mono">{s.roll_no || '—'}</td>
                <td style={{ fontWeight: 500 }}>{s.name || '—'}</td>
                <td><span className="badge badge-branch">{s.branch || '—'}</span></td>
                <td className="td-mono">{s.section || '—'}</td>
                <td className="td-mono" style={{ color: 'var(--accent)' }}>{s.sgpa ?? '—'}</td>
                <td className="td-mono" style={{ fontWeight: 700, color: 'var(--success)' }}>{s.cgpa ?? '—'}</td>
                {isAdmin && (
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/admin/students/${s.roll_no}`)}>
                      View →
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
