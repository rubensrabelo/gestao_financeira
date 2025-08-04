from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from starlette import status
from datetime import datetime, timezone

from database import get_session
from models.Transaction import Transaction
from models.User import User
from dto.transaction import (
    TransactionCreateDTO, TransactionUpdateDTO, TransactionResponseDTO
)
from middleware.auth import get_current_user

router = APIRouter()


@router.post(
        "/",
        response_model=TransactionResponseDTO,
        status_code=status.HTTP_201_CREATED
)
async def create(
    transaction_create: TransactionCreateDTO,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> TransactionResponseDTO:
    ...


@router.get(
        "/",
        response_model=list[TransactionResponseDTO],
        status_code=status.HTTP_200_OK
)
async def get_all(
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=10, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> list[TransactionResponseDTO]:
    ...


@router.get(
        "/{id}",
        response_model=TransactionResponseDTO,
        status_code=status.HTTP_200_OK
)
async def get_by_id(
    id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> TransactionResponseDTO:
    ...


@router.put(
        "/{id}",
        response_model=TransactionResponseDTO,
        status_code=status.HTTP_200_OK
)
async def update(
    id: int,
    transaction_update: TransactionUpdateDTO,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> TransactionResponseDTO:
    ...


@router.delete(
        "/{id}",
        status_code=status.HTTP_204_NO_CONTENT
)
async def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> None:
    ...
