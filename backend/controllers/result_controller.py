from fastapi import APIRouter, Depends
from services import result_service
from models.result_model import SemesterResult

from auth.rbac import (
    require_admin,
    require_student_or_admin
)

router = APIRouter()


@router.get("/{roll_no}")
def get_results(
    roll_no: str,
    user=Depends(require_student_or_admin)
):
    return result_service.get_student_results(roll_no)


@router.post("/{roll_no}")
def add_result(
    roll_no: str,
    result: SemesterResult,
    user=Depends(require_admin)
):
    return result_service.add_result(roll_no, result)