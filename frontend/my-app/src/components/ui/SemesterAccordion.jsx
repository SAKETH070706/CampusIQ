import { useState } from 'react'
import SubjectTable from './SubjectTable'

function ChevronIcon({ open }) {
  return (
    <svg className="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function SemesterAccordion({ semesters = [] }) {
  const [openIndex, setOpenIndex] = useState(semesters.length - 1)

  if (!semesters.length) return <p className="text-muted">No semester data available.</p>

  return (
    <div className="accordion">
      {semesters.map((sem, i) => {
        const isOpen = openIndex === i
        const failCount = (sem.subjects || []).filter(
          s => s.result?.toLowerCase() === 'fail' || s.grade === 'F'
        ).length

        return (
          <div key={i} className={`accordion-item${isOpen ? ' open' : ''}`}>
            <button
              className="accordion-trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span className="sem-name">Semester {sem.semester}</span>
              <div className="sem-meta">
                {failCount > 0 && (
                  <span className="badge badge-fail" style={{ marginRight: 4 }}>
                    {failCount} fail{failCount > 1 ? 's' : ''}
                  </span>
                )}
                <div className="sem-stat">
                  <span className="val">{sem.sgpa ?? '—'}</span>
                  <span className="lbl">SGPA</span>
                </div>
                <div className="sem-stat" style={{ marginLeft: 12 }}>
                  <span className="val">{sem.cgpa ?? '—'}</span>
                  <span className="lbl">CGPA</span>
                </div>
                <div className="sem-stat" style={{ marginLeft: 12 }}>
                  <span className="val">
                    {sem.credits_secured ?? '—'}/{sem.total_credits ?? '—'}
                  </span>
                  <span className="lbl">Credits</span>
                </div>
              </div>
              <ChevronIcon open={isOpen} />
            </button>

            {isOpen && (
              <div className="accordion-body">
                <SubjectTable subjects={sem.subjects || []} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
