from fastapi import APIRouter, HTTPException
from typing import List
from repositories.student_repository import get_all_students
import repositories.student_repository as student_repository
import services.analytics_service as analytics_service
from models.analytics_models import (
    TopperResponse,
    BranchAverageResponse,
    FailureResponse,
    SubjectStatisticsResponse,
    RankingResponse
)

router = APIRouter()

@router.get("/topper", response_model=TopperResponse)
def topper():
    result = analytics_service.get_topper()
    if not result:
        raise HTTPException(status_code=404, detail="No topper found")
    return result

@router.get("/branch/{branch}", response_model=BranchAverageResponse)
def branch_average(branch: str):
    result = analytics_service.get_branch_average(branch)
    if not result:
        raise HTTPException(status_code=404, detail="No students found in branch")
    return result

@router.get("/failures", response_model=List[FailureResponse])
def failures():
    students = student_repository.get_all_students()
    return analytics_service.get_failures(students)

@router.get("/failures/branch/{branch}", response_model=List[FailureResponse])
def failures_by_branch(branch: str):
    return analytics_service.get_failures_by_branch(branch)

@router.get("/failures/section/{section}", response_model=List[FailureResponse])
def failures_by_section(section: str):
    return analytics_service.get_failures_by_section(section)

@router.get("/failures/branch/{branch}/section/{section}", response_model=List[FailureResponse])
def failures_by_branch_and_section(branch: str, section: str):
    return analytics_service.get_failures_by_branch_and_section(branch, section)

@router.get("/subject/{sub_code}", response_model=SubjectStatisticsResponse)
def subject_stats(sub_code: str):
    result = analytics_service.subject_statistics(sub_code)
    if not result:
        raise HTTPException(status_code=404, detail="No statistics found")
    return result

@router.get("/ranking", response_model=List[RankingResponse])
def ranking():
    result = analytics_service.rank_students()
    if not result:
        raise HTTPException(status_code=404, detail="No students found")
    return result

@router.get("/ranking/merit", response_model=List[RankingResponse])
def merit_ranking():
    result = analytics_service.rank_students_merit()

    if not result:
        raise HTTPException(
            status_code=404,
            detail="No students found"
        )

    return result