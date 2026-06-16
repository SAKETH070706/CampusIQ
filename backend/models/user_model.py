from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):
    roll_no: str
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "student"


class UserLogin(BaseModel):
    roll_no: str
    password: str


class UserResponse(BaseModel):
    roll_no: str
    name: str
    email: str
    role: str