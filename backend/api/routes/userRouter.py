from fastapi import APIRouter, Depends
from sqlmodel import Session
from starlette import status

from database import get_session
from utils.security import hash_password
from middleware.auth import get_current_user
from dto.user import UserResponseDTO, UserUpdateDTO
from models.User import User

router = APIRouter()


@router.get(
        "/me",
        response_model=UserResponseDTO,
        status_code=status.HTTP_200_OK
)
async def get_profile(
    current_user: User = Depends(get_current_user)
) -> UserResponseDTO:
    return current_user


@router.put(
        "/me",
        response_model=UserResponseDTO,
        status_code=status.HTTP_200_OK
)
async def update_profile(
    user_update: UserUpdateDTO,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> UserUpdateDTO:
    update_data = user_update.model_dump(exclude_unset=True)

    if "password" in update_data:
        update_data["password"] = hash_password(update_data["password"])

    for key, value in update_data.items():
        setattr(current_user, key, value)

    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


@router.delete(
        "/me",
        status_code=status.HTTP_204_NO_CONTENT
)
async def delete_profile(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> None:
    current_user.active = False
    session.add(current_user)
    session.commit()
