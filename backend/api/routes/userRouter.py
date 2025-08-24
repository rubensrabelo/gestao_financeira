from fastapi import APIRouter, Depends
from sqlmodel import Session
from starlette import status

from database import get_session
from middleware.auth import get_current_user
from dto.user import UserResponseDTO, UserUpdateDTO
from models.UserModel import UserModel
from api.services import userService

router = APIRouter()


@router.get(
    "/me",
    response_model=UserResponseDTO,
    status_code=status.HTTP_200_OK
)
async def get_profile(
    current_user: UserModel = Depends(get_current_user)
) -> UserResponseDTO:
    return userService.get_profile(current_user)


@router.put(
    "/me",
    response_model=UserResponseDTO,
    status_code=status.HTTP_200_OK
)
async def update(
    user_update: UserUpdateDTO,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> UserResponseDTO:
    return userService.update(user_update, session, current_user)


@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete(
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> None:
    return userService.delete(session, current_user)
