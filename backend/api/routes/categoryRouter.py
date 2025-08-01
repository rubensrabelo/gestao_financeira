from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from database import get_session
from models.Category import Category
from models.User import User
from dto.category import CategoryCreateDTO, CategoryResponseDTO, CategoryUpdateDTO
from middleware.auth import get_current_user

router = APIRouter()


@router.get(
    "/",
    response_model=CategoryResponseDTO,
    status_code=status.HTTP_200_OK
)
async def create() -> CategoryResponseDTO:
    ...


@router.get(
    "/",
    response_model=CategoryResponseDTO,
    status_code=status.HTTP_200_OK
)
async def get_all() -> CategoryResponseDTO:
    ...


@router.get(
    "/",
    response_model=CategoryResponseDTO,
    status_code=status.HTTP_200_OK
)
async def get_by_id() -> CategoryResponseDTO:
    ...

@router.get(
    "/",
    response_model=CategoryResponseDTO,
    status_code=status.HTTP_200_OK
)
async def update() -> CategoryResponseDTO:
    ...

@router.get(
    "/",
    status_code=status.HTTP_200_OK
)
async def delete() -> CategoryResponseDTO:
    ...
