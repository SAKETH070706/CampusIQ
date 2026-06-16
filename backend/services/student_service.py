from repositories import student_repository


def get_student(roll_no: str):
    return student_repository.find_by_roll_no(roll_no)


def student_exists(roll_no: str):
    student = student_repository.find_by_roll_no(roll_no)
    return student is not None


def add_student(student_data: dict):
    if student_exists(student_data["roll_no"]):
        return {"error": "Student already exists"}

    student_repository.insert(student_data)
    return {"msg": "Student inserted successfully"}


def get_students_by_branch(branch_code: str):
    return student_repository.get_students_by_branch(branch_code)


def get_students_by_section(section: str):
    return student_repository.get_students_by_section(section)


def get_students_by_branch_and_section(branch_code: str, section: str):
    return student_repository.get_students_by_branch_and_section(branch_code, section)
