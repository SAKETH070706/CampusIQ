from pydantic import BaseModel


class SubjectResult(BaseModel):

    subject_code: str
    subject_name: str

    credits: float

    grade: str

    exam_month: str

    result: str