from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from starlette import status
from datetime import datetime, timezone

from database import get_session
from models.CategoryModel import CategoryModel
from models.UserModel import UserModel
from dto.category import (
    CategoryCreateDTO, CategoryResponseDTO, CategoryUpdateDTO
)
from middleware.auth import get_current_user

router = APIRouter()


@router.post(
    "/",
    response_model=CategoryResponseDTO,
    status_code=status.HTTP_201_CREATED
)
async def create(
    category_create: CategoryCreateDTO,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> CategoryResponseDTO:
    statement = (
        select(CategoryModel)
        .where(CategoryModel.name == category_create.name)
        .where(CategoryModel.user_id == current_user.id)
    )
    existing_category = session.exec(statement).first()
    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
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


@router.get(
    "/",
    response_model=list[CategoryResponseDTO],
    status_code=status.HTTP_200_OK
)
async def get_all(
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=10, le=100),
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> list[CategoryResponseDTO]:
    statement = (
        select(CategoryModel)
        .where(CategoryModel.user_id == current_user.id)
        .order_by(CategoryModel.name)
        .offset(offset)
        .limit(limit)
    )
    return session.exec(statement).all()


@router.get(
    "/{id}",
    response_model=CategoryResponseDTO,
    status_code=status.HTTP_200_OK
)
async def get_by_id(
    id: int,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> CategoryResponseDTO:
    category = session.get(CategoryModel, id)
    if not category or category.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found."
        )
    return category


@router.put(
    "/{id}",
    response_model=CategoryResponseDTO,
    status_code=status.HTTP_200_OK
)
async def update(
    id: int,
    category_update: CategoryUpdateDTO,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> CategoryResponseDTO:
    category = session.get(CategoryModel, id)
    if not category or category.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    for key, value in category_update.model_dump(exclude_unset=True).items():
        setattr(category, key, value)

    category.updated_at = datetime.now(timezone.utc)

    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> None:
    category = session.get(CategoryModel, id)
    if not category or category.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    session.delete(category)
    session.commit()
