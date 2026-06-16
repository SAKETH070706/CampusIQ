import { useParams, useNavigate } from 'react-router-dom'
import { useStudentByRoll } from '../../hooks/useStudent'
import { useStudentResults } from '../../hooks/useResults'
import ProfileCard from '../../components/ui/ProfileCard'
import SemesterAccordion from '../../components/ui/SemesterAccordion'
import SGPATrendChart from '../../components/charts/SGPATrendChart'
import CGPATrendChart from '../../components/charts/CGPATrendChart'
import GradeDistributionChart from '../../components/charts/GradeDistributionChart'
import PassFailChart from '../../components/charts/PassFailChart'
import { SkeletonCard } from '../../components/ui/SkeletonLoader'

export default function StudentDetailPage() {
  const { roll_no } = useParams()
  const navigate    = useNavigate()

  // /students/{roll_no} → full student document { roll_no, student_info, semesters, ... }
  const { data: student, isLoading: sLoad, isError: sErr } = useStudentByRoll(roll_no)

  // BUG #12 FIX: /results/{roll_no} returns a plain ARRAY of SemesterResult
  // NOT an object with .semesters. Previous code did `results?.semesters` which is always undefined.
  const { data: resultsArr, isLoading: rLoad } = useStudentResults(roll_no)

  // Use results array when available, fall back to student.semesters
  const semesters = (Array.isArray(resultsArr) && resultsArr.length > 0)
    ? resultsArr
    : (student?.semesters || [])

  const allSubjects = semesters.flatMap(s => s.subjects || [])

  if (sLoad || rLoad) {
    return (
      <div>
        <div className="skeleton" style={{ height: 130, borderRadius: 16, marginBottom: 24 }} />
        <SkeletonCard height={260} />
      </div>
    )
  }

  if (sErr || !student) {
    return (
      <div>
        <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>← Back</button>
        <div className="error-banner">⚠️ Student not found for roll number: {roll_no}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title-row">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Back</button>
          <h1>👤 Student Profile</h1>
        </div>
      </div>

      {/* ProfileCard expects full student doc with student_info */}
      <ProfileCard student={student} />

      {/* Charts */}
      {semesters.length > 1 && (
        <div className="grid-2 mb-24" style={{ marginBottom: 24 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">📈 SGPA Trend</div>
            </div>
            <SGPATrendChart semesters={semesters} />
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">📊 CGPA Progression</div>
            </div>
            <CGPATrendChart semesters={semesters} />
          </div>
        </div>
      )}

      {allSubjects.length > 0 && (
        <div className="grid-2 mb-24" style={{ marginBottom: 24 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">📚 Grade Distribution</div>
            </div>
            <GradeDistributionChart subjects={allSubjects} />
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">✅ Pass / Fail Ratio</div>
            </div>
            <PassFailChart subjects={allSubjects} />
          </div>
        </div>
      )}

      {/* Semester Accordion */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📅 Semester-wise Results</div>
          <span className="badge badge-grade">{semesters.length} semesters</span>
        </div>
        <SemesterAccordion semesters={semesters} />
      </div>
    </div>
  )
}