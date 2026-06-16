from repositories import user_repository

from auth.password_handler import (
    hash_password,
    verify_password
)

from auth.jwt_handler import create_access_token


def register_user(user):

    existing_user = user_repository.find_user_by_roll_no(
        user.roll_no
    )

    if existing_user:
        raise HTTPException(
         status_code=400,
        detail="User already exists"
    )

    hashed_password = hash_password(
        user.password
    )

    user_data = {
        "roll_no": user.roll_no,
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role
    }

    user_repository.create_user(user_data)

    return {
        "msg": "User registered successfully"
    }


from fastapi import HTTPException

def login_user(user):

    db_user = user_repository.find_user_by_roll_no(
        user.roll_no
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    password_valid = verify_password(
        user.password,
        db_user["password"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({
        "roll_no": db_user["roll_no"],
        "role": db_user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user["role"]
    }