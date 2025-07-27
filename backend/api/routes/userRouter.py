from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
# from sqlalchemy.orm import joinedload
from starlette import status

from database import get_session
from utils.security import hash_password
from dto.user import UserResponseDTO, UserCreateDTO, UserUpdateDTO
from models.User import User

router = APIRouter()


@router.post(
        "/",
        response_model=UserResponseDTO,
        status_code=status.HTTP_201_CREATED
)
async def create(
    user_create: UserCreateDTO,
    session: Session = Depends(get_session)
) -> UserResponseDTO:
    statement = select(User).where(User.email == user_create.email)
    user_exists = session.exec(statement).first()
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email already exists."
        )
    user_create.password = hash_password(user_create.password)
    user = User(**user_create.model_dump())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get(
        "/{user_id}",
        response_model=UserResponseDTO,
        status_code=status.HTTP_200_OK
)
async def find_by_id(
    user_id: int,
    session: Session = Depends(get_session)
) -> UserResponseDTO:
    statement = (
        select(User).where(User.id == user_id)
    )
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    return user


@router.put(
        "/{user_id}",
        response_model=UserResponseDTO,
        status_code=status.HTTP_200_OK
)
async def update(
    user_id: int,
    user_update: UserUpdateDTO,
    session: Session = Depends(get_session)
) -> UserResponseDTO:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    for key, value in user_update.model_dump(exclude_unset=True).items():
        setattr(user, key, value)

    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.delete(
        "/{user_id}"
)
async def delete(
    user_id: int,
    session: Session = Depends(get_session)
) -> None:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    user.active = False
    session.add(user)
    session.commit()
