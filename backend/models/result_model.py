from pydantic import BaseModel, Field
from typing import List

from models.subject_model import SubjectResult


class SemesterResult(BaseModel):

    semester: str

    sgpa: float

    cgpa: float

    total_credits: float

    credits_secured: float

    subjects: List[SubjectResult] = Field(
        default_factory=list
    )