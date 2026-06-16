from fastapi import APIRouter
from models.user_model import (
    UserRegister,
    UserLogin
)

from services import auth_service


router = APIRouter()
@router.post("/register")
def register(user: UserRegister):

    return auth_service.register_user(user)


@router.post("/login")
def login(user: UserLogin):

    return auth_service.login_user(user)