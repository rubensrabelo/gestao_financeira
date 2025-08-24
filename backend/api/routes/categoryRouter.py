from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from starlette import status

from database import get_session
from models.UserModel import UserModel
from dto.category import (
    CategoryCreateDTO, CategoryResponseDTO, CategoryUpdateDTO
)
from middleware.auth import get_current_user
from api.services import categoryService

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
    return categoryService.create(category_create, session, current_user)


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
    return categoryService.get_all(offset, limit, session, current_user)


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
    return categoryService.get_by_id(id, session, current_user)


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
    return categoryService.update(id, category_update, session, current_user)


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> None:
    return categoryService.delete(id, session, current_user)
