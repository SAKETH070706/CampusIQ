from pydantic import BaseModel, Field
from typing import List

from models.result_model import SemesterResult


class StudentInfo(BaseModel):

    hallticket_no: str

    student_name: str

    programme: str

    branch_code: str

    section: str

class Student(BaseModel):

    roll_no: str

    data_source: str

    student_info: StudentInfo

    semesters: List[SemesterResult] = Field(
        default_factory=list
    )