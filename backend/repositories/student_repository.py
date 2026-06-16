import database.mongo as mongo


def insert(student_data: dict):
    mongo.db.students.insert_one(student_data)


def find_by_roll_no(roll_no: str):
    return mongo.db.students.find_one(
        {"roll_no": roll_no},
        {"_id": 0}
    )


def get_all_students():
    return list(
        mongo.db.students.find({}, {"_id": 0})
    )


def get_students_by_branch(branch: str):
    return list(
        mongo.db.students.find(
            {"student_info.branch_code": branch},
            {"_id": 0}
        )
    )


def get_students_by_section(section: str):
    return list(
        mongo.db.students.find(
            {"student_info.section": section},
            {"_id": 0}
        )
    )


def get_students_by_branch_and_section(branch: str, section: str):
    return list(
        mongo.db.students.find(
            {
                "student_info.branch_code": branch,
                "student_info.section": section
            },
            {"_id": 0}
        )
    )


def update_student(roll_no: str, student_data: dict):
    mongo.db.students.update_one(
        {"roll_no": roll_no},
        {"$set": student_data},
        upsert=True
    )
