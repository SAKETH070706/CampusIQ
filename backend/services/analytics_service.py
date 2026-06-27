
from repositories import student_repository


def rank_students():
    students = student_repository.get_all_students()
    total_students = len(students)
    if total_students == 0:
        return []

    ranking = []

    for s in students:
        semesters = s.get("semesters", [])
        if not semesters:
            continue

        valid_semesters = []
        for sem in semesters:
            try:
                cgpa = float(sem.get("cgpa", 0))
                if cgpa > 0:
                    valid_semesters.append(sem)
            except:
                continue

        if not valid_semesters:
            continue

        latest_valid_sem = valid_semesters[-1]

        try:
            cgpa = float(latest_valid_sem.get("cgpa", 0))
        except:
            cgpa = 0

        try:
            sgpa = float(latest_valid_sem.get("sgpa", 0))
        except:
            sgpa = 0

        student_info = s.get("student_info", {})
        ranking.append({
            "roll_no": s.get("roll_no"),
            "name": student_info.get("student_name", "N/A"),
            "branch": student_info.get("branch_code", "N/A"),
            "section": student_info.get("section", "N/A"),
            "cgpa": cgpa,
            "sgpa": sgpa,
            "total_students": total_students,
        })

    ranking.sort(key=lambda x: x["cgpa"], reverse=True)

    for idx, student in enumerate(ranking, start=1):
        student["rank"] = idx

    return ranking

def rank_students_merit():

    students = student_repository.get_all_students()

    total_students = len(students)

    if total_students == 0:
        return []

    ranking = []

    for s in students:

        semesters = s.get("semesters", [])

        if not semesters:
            continue

        valid_semesters = []

        for sem in semesters:

            try:

                cgpa = float(
                    sem.get("cgpa", 0)
                )

                if cgpa > 0:
                    valid_semesters.append(sem)

            except:
                continue

        if not valid_semesters:
            continue

        latest_sem = valid_semesters[-1]

        cgpa = float(
            latest_sem.get("cgpa", 0)
        )

        sgpa = float(
            latest_sem.get("sgpa", 0)
        )

        extra_attempts = 0

        for sem in semesters:

            for subject in sem.get("subjects", []):

                attempts = subject.get(
                    "attempts",
                    1
                )

                if attempts > 1:
                    extra_attempts += (
                        attempts - 1
                    )

        info = s.get("student_info", {})

        ranking.append({

            "roll_no": s.get("roll_no"),

            "name": info.get(
                "student_name",
                "N/A"
            ),

            "branch": info.get(
                "branch_code",
                "N/A"
            ),

            "section": info.get(
                "section",
                "N/A"
            ),

            "cgpa": cgpa,

            "sgpa": sgpa,

            "total_students": total_students,

            "extra_attempts": extra_attempts
        })

    ranking.sort(
        key=lambda x: (
            x["extra_attempts"],
            -x["cgpa"],
            -x["sgpa"]
        )
    )

    for index, student in enumerate(
        ranking,
        start=1
    ):

        student["rank"] = index

    return ranking

def get_topper():
   
    ranking = rank_students()
    if not ranking:
        return None
    return ranking[0]


def get_branch_average(branch: str):
    students = student_repository.get_students_by_branch(branch)
    if not students:
        return None

    cgpas = [
        float(sem["cgpa"])
        for s in students
        for sem in s.get("semesters", [])
        if float(sem["cgpa"]) > 0
    ]

    return {
        "branch": branch,
        "average_cgpa": sum(cgpas) / len(cgpas) if cgpas else 0.0
    }


def get_failures(students):
    failed_students = []

    for s in students:
        latest_status = {}

        for sem in s.get("semesters", []):
            for subj in sem.get("subjects", []):
                code = subj["subject_code"]
                latest_status[code] = {
                    "semester": sem["semester"],
                    "subject_name": subj["subject_name"],
                    "result": subj["result"].lower(),
                    "attempts": subj.get("attempts", 1)
                }

        failed_subjects = [
            {
                "semester": v["semester"],
                "subject_name": v["subject_name"],
                "attempts": v["attempts"]
            }
            for v in latest_status.values()
            if v["result"] == "fail"
        ]

        if failed_subjects:
            failed_students.append({
                "roll_no": s.get("roll_no"),
                "name": s.get("student_info", {}).get("student_name", "N/A"),
                "section": s.get("student_info", {}).get("section", "N/A"),
                "failed_subjects": failed_subjects
            })

    return failed_students


def get_failures_by_branch(branch):
    students = student_repository.get_students_by_branch(branch)
    return get_failures(students)


def get_failures_by_section(section):
    students = student_repository.get_students_by_section(section)
    return get_failures(students)


def get_failures_by_branch_and_section(branch, section):
    students = student_repository.get_students_by_branch_and_section(branch, section)
    return get_failures(students)


def subject_statistics(subject_code: str):
    students = student_repository.get_all_students()
    stats = []

    for s in students:
        for sem in s.get("semesters", []):
            for subj in sem.get("subjects", []):
                if subj["subject_code"].lower() == subject_code.lower():
                    stats.append({
                        "roll_no": s.get("roll_no"),
                        "name": s.get("student_info", {}).get("student_name", "N/A"),
                        "branch": s.get("student_info", {}).get("branch_code", "N/A"),
                        "section": s.get("student_info", {}).get("section", "N/A"),
                        "semester": sem.get("semester"),
                        "grade": subj.get("grade")
                    })

    return {
        "sub_code": subject_code,
        "statistics": stats
    }
