from jose import jwt
from datetime import datetime, timedelta
from config.settings import Settings



def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=Settings().ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        Settings().SECRET_KEY,
        algorithm=Settings().ALGORITHM
    )


def decode_access_token(token: str):

    return jwt.decode(
        token,
        Settings().SECRET_KEY,
        algorithms=[Settings().ALGORITHM]
    )