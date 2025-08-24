from fastapi import APIRouter, Depends
from sqlmodel import Session
from starlette import status

from database import get_session
from dto.user import UserResponseDTO, UserCreateDTO
from dto.auth import LoginDTO, TokenDTO
from api.services import authService

router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponseDTO,
    status_code=status.HTTP_201_CREATED
)
async def register(
    user_create: UserCreateDTO,
    session: Session = Depends(get_session)
) -> UserResponseDTO:
    return authService.register(user_create, session)


@router.post(
    "/login",
    response_model=TokenDTO,
    status_code=status.HTTP_200_OK
)
async def login(
    credentials: LoginDTO,
    session: Session = Depends(get_session)
) -> TokenDTO:
    return authService.login(credentials, session)
