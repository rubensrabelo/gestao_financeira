from fastapi import HTTPException
from sqlmodel import Session, select
from starlette import status

from utils.security import hash_password, verify_password, create_access_token
from dto.user import UserCreateDTO, UserResponseDTO
from dto.auth import LoginDTO, TokenDTO
from models.UserModel import UserModel


def register(
        user_create: UserCreateDTO,
        session: Session
) -> UserResponseDTO:
    """Cria um novo usuário no sistema."""
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


def login(credentials: LoginDTO, session: Session) -> TokenDTO:
    """Realiza autenticação de usuário e retorna o token JWT."""
    statement = select(UserModel).where(UserModel.email == credentials.email)
    user = session.exec(statement).first()

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({"sub": str(user.id)})
    return TokenDTO(access_token=token)
