import useAuth from '../../hooks/useAuth'
import { useStudentResults } from '../../hooks/useResults'
import { useStudentByRoll } from '../../hooks/useStudent'
import SemesterAccordion from '../../components/ui/SemesterAccordion'
import ProfileCard from '../../components/ui/ProfileCard'
import { SkeletonCard } from '../../components/ui/SkeletonLoader'

export default function StudentResultsPage() {
  const { user } = useAuth()
  const roll_no  = user?.roll_no

  // /results/{roll_no} returns a plain array of SemesterResult
  const { data: resultsArr, isLoading: rLoad, error: rErr } = useStudentResults(roll_no)
  // /students/{roll_no} returns full student doc (needed for ProfileCard's student_info)
  const { data: student,    isLoading: sLoad }               = useStudentByRoll(roll_no)

  const semesters = Array.isArray(resultsArr) ? resultsArr : []

  if (!roll_no) {
    return <div className="empty-state"><p>No roll number found.</p></div>
  }

  if (rLoad || sLoad) {
    return (
      <div>
        <div className="page-header"><h1>📚 Academic Results</h1></div>
        <SkeletonCard />
      </div>
    )
  }

  if (rErr) {
    return <div className="empty-state"><p>Failed to load results.</p></div>
  }

  return (
    <div>
      <div className="page-header">
        <h1>📚 Academic Results</h1>
        <p>Semester-wise performance and subject grades</p>
      </div>

      {/* Pass the full student document — ProfileCard reads student.student_info */}
      <ProfileCard student={student} rollNo={roll_no} />

      <div style={{ marginTop: '24px' }}>
        <SemesterAccordion semesters={semesters} />
      </div>
    </div>
  )
}
