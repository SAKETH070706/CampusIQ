from pydantic import BaseModel
from typing import List

class TopperResponse(BaseModel):
    roll_no: str
    name: str
    branch: str
    section: str
    sgpa: float
    cgpa: float

class BranchAverageResponse(BaseModel):
    branch: str
    average_cgpa: float

class FailedSubject(BaseModel):
    semester: str
    subject_name: str
    attempts: int


class FailureResponse(BaseModel):
    roll_no: str
    name: str
    section: str
    failed_subjects: List[FailedSubject]

class SubjectStat(BaseModel):
    roll_no: str
    name: str
    section: str
    grade: str

class SubjectStatisticsResponse(BaseModel):
    sub_code: str
    statistics: List[SubjectStat]

class RankingResponse(BaseModel):
    rank: int
    roll_no: str
    name: str
    branch: str
    section: str
    cgpa: float
    sgpa: float
    total_students: int