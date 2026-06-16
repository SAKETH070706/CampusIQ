from repositories import student_repository



def get_student_results(roll_no: str):

    student = student_repository.find_by_roll_no(
        roll_no
    )

    if not student:
        return None

    return student.get("semesters", [])

