from fastapi import Depends, Request, HTTPException
from fastapi.security import HTTPBearer
from auth.jwt_handler import decode_access_token


class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        credentials = await super().__call__(request)

        if credentials:
            token = credentials.credentials
            try:
                payload = decode_access_token(token)
                return payload
            except Exception:
                raise HTTPException(
                    status_code=403,
                    detail="Invalid token"
                )

        raise HTTPException(
            status_code=403,
            detail="Invalid authorization code")


def require_admin(current_user=Depends(JWTBearer())):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )
    return current_user


def require_student_or_admin(
    roll_no: str,
    current_user=Depends(JWTBearer())
):
    if (
        current_user["role"] != "admin"
        and current_user["roll_no"] != roll_no
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )
    return current_user
