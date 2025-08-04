from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from starlette import status

from database import get_session
from utils.security import hash_password, verify_password, create_access_token
from dto.user import UserResponseDTO, UserCreateDTO
from dto.auth import LoginDTO, TokenDTO
from models.UserModel import UserModel

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
    statement = select(UserModel).where(UserModel.email == user_create.email)
    if session.exec(statement).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email already exists."
        )

    user_create.password = hash_password(user_create.password)
    user = UserModel(**user_create.model_dump())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.post(
        "/login",
        response_model=TokenDTO,
        status_code=status.HTTP_200_OK
)
async def login(
    credentials: LoginDTO,
    session: Session = Depends(get_session)
) -> TokenDTO:
    statement = select(UserModel).where(UserModel.email == credentials.email)
    user = session.exec(statement).first()

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({"sub": str(user.id)})
    return TokenDTO(access_token=token)
