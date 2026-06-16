export default function ProfileCard({ student, rollNo }) {
  if (!student) return null

  // If backend returns semesters array directly
  const semesters = Array.isArray(student)
    ? student
    : (student.semesters || [])

  const info = student.student_info || {}

  const lastSem =
    semesters.length > 0
      ? semesters[semesters.length - 1]
      : null

  const initials = (
    info.student_name || rollNo || "S"
  )
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        {initials}
      </div>

      <div>
        <div className="profile-name">
          {info.student_name || rollNo || "Student"}
        </div>

        <div className="profile-roll">
          {info.hallticket_no || rollNo}
        </div>

        <div className="profile-tags">
          {info.branch_code && (
            <span className="badge badge-branch">
              {info.branch_code}
            </span>
          )}

          {info.section && (
            <span className="badge badge-grade">
              Section {info.section}
            </span>
          )}

          {info.programme && (
            <span className="badge badge-student">
              {info.programme}
            </span>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat-item">
          <span className="val">
            {lastSem?.cgpa ?? "—"}
          </span>
          <span className="lbl">CGPA</span>
        </div>

        <div className="profile-stat-item">
          <span className="val">
            {lastSem?.sgpa ?? "—"}
          </span>
          <span className="lbl">Latest SGPA</span>
        </div>

        <div className="profile-stat-item">
          <span className="val">
            {semesters.length}
          </span>
          <span className="lbl">Semesters</span>
        </div>

        <div className="profile-stat-item">
          <span className="val">
            {lastSem?.credits_secured ??
              lastSem?.total_credits ??
              "—"}
          </span>
          <span className="lbl">Credits</span>
        </div>
      </div>
    </div>
  )
}