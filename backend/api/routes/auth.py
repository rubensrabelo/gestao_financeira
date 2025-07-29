from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from starlette import status

from database import get_session
from models.User import User
from dto.auth import LoginDTO, TokenDTO
from utils.security import verify_password, create_access_token

router = APIRouter()


@router.post(
        "/",
        response_model=TokenDTO,
        status_code=status.HTTP_200_OK
)
async def login(
        credentials: LoginDTO,
        session: Session = Depends(get_session)
) -> TokenDTO:
    statement = select(User).where(User.email == credentials.email)
    user = session.exec(statement).first()

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({"sub": str(user.id)})
    return TokenDTO(access_token=token)
