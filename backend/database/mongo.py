from pymongo import MongoClient
from config.settings import settings

client = None
db = None


def connect_db():
    global client, db

    client = MongoClient(settings.MONGO_URI)

    db = client[settings.DB_NAME]

    # USERS
    db.users.create_index("roll_no", unique=True)

    # STUDENTS
    db.students.create_index(
    "roll_no",
    unique=True
   )

    db.students.create_index(
    "student_info.branch_code"
   )

    db.students.create_index(
    "student_info.section"
     )

    db.students.create_index(
    [
        ("student_info.branch_code", 1),
        ("student_info.section", 1)
    ]
)

    # RESULTS
    db.results.create_index("roll_no")
    db.results.create_index("semester")

    print(f"✅ MongoDB connected -> {settings.DB_NAME}")

    return db