from fastapi import APIRouter, Depends
from services import student_service
from auth.rbac import (
    require_admin,
    require_student_or_admin
)

router = APIRouter()


@router.get("/{roll_no}")
def get_student(
    roll_no: str,
    user=Depends(require_student_or_admin)
):
    return student_service.get_student(roll_no)


@router.post("/")
def add_student(
    student: dict,
    user=Depends(require_admin)
):
    return student_service.add_student(student)


@router.get("/branch/{branch_code}")
def get_students_by_branch(
    branch_code: str,
    user=Depends(require_admin)   
):
    return student_service.get_students_by_branch(branch_code)


@router.get("/section/{section}")
def get_students_by_section(
    section: str,
    user=Depends(require_admin)   # only admins/teachers
):
    return student_service.get_students_by_section(section)


@router.get("/branch/{branch_code}/section/{section}")
def get_students_by_branch_and_section(
    branch_code: str,
    section: str,
    user=Depends(require_admin)   # only admins/teachers
):
    return student_service.get_students_by_branch_and_section(branch_code, section)
