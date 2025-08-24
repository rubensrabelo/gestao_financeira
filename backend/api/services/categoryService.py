from datetime import datetime, timezone
from fastapi import HTTPException
from sqlmodel import Session, select

from models.CategoryModel import CategoryModel
from models.UserModel import UserModel
from dto.category import (
    CategoryCreateDTO, CategoryResponseDTO, CategoryUpdateDTO
)


def create(
    category_create: CategoryCreateDTO,
    session: Session,
    current_user: UserModel
) -> CategoryResponseDTO:
    """Cria uma categoria para o usuário autenticado."""
    statement = (
        select(CategoryModel)
        .where(CategoryModel.name == category_create.name)
        .where(CategoryModel.user_id == current_user.id)
    )
    existing_category = session.exec(statement).first()
    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Category already exists for this user."
        )
    category = CategoryModel(
        **category_create.model_dump(),
        user_id=current_user.id
    )
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


def get_all(
    offset: int,
    limit: int,
    session: Session,
    current_user: UserModel
) -> list[CategoryResponseDTO]:
    """Retorna todas as categorias do usuário autenticado (com paginação)."""
    statement = (
        select(CategoryModel)
        .where(CategoryModel.user_id == current_user.id)
        .order_by(CategoryModel.name)
        .offset(offset)
        .limit(limit)
    )
    return session.exec(statement).all()


def get_by_id(
    id: int,
    session: Session,
    current_user: UserModel
) -> CategoryResponseDTO:
    """Busca categoria por ID do usuário autenticado."""
    category = session.get(CategoryModel, id)
    if not category or category.user_id != current_user.id:
        raise HTTPException(
            status_code=404,
            detail="Category not found."
        )
    return category


def update(
    id: int,
    category_update: CategoryUpdateDTO,
    session: Session,
    current_user: UserModel
) -> CategoryResponseDTO:
    """Atualiza uma categoria do usuário autenticado."""
    category = session.get(CategoryModel, id)
    if not category or category.user_id != current_user.id:
        raise HTTPException(
            status_code=404,
            detail="Category not found."
        )

    for key, value in category_update.model_dump(exclude_unset=True).items():
        setattr(category, key, value)

    category.updated_at = datetime.now(timezone.utc)

    session.add(category)
    session.commit()
    session.refresh(category)
    return category


def delete(
    id: int,
    session: Session,
    current_user: UserModel
) -> None:
    """Exclui uma categoria do usuário autenticado."""
    category = session.get(CategoryModel, id)
    if not category or category.user_id != current_user.id:
        raise HTTPException(
            status_code=404,
            detail="Category not found."
        )

    session.delete(category)
    session.commit()
