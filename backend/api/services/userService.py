from datetime import datetime, timezone
from sqlmodel import Session

from utils.security import hash_password
from dto.user import UserResponseDTO, UserUpdateDTO
from models.UserModel import UserModel


def get_profile(current_user: UserModel) -> UserResponseDTO:
    """Retorna o perfil do usuário autenticado."""
    return current_user


def update(
    user_update: UserUpdateDTO,
    session: Session,
    current_user: UserModel
) -> UserResponseDTO:
    """Atualiza os dados do usuário autenticado."""
    update_data = user_update.model_dump(exclude_unset=True)

    if "password" in update_data and update_data["password"]:
        update_data["password"] = hash_password(update_data["password"])

    for key, value in update_data.items():
        setattr(current_user, key, value)

    current_user.updated_at = datetime.now(timezone.utc)

    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


def delete(session: Session, current_user: UserModel) -> None:
    """Desativa o usuário (soft delete)."""
    current_user.active = False
    current_user.updated_at = datetime.now(timezone.utc)

    session.add(current_user)
    session.commit()
