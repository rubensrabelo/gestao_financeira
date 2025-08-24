from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from starlette import status

from database import get_session
from models.UserModel import UserModel
from dto.transaction import (
    TransactionCreateDTO, TransactionUpdateDTO, TransactionResponseDTO
)
from middleware.auth import get_current_user
from api.services import transactionService

router = APIRouter()


@router.post(
    "/",
    response_model=TransactionResponseDTO,
    status_code=status.HTTP_201_CREATED
)
async def create(
    transaction_create: TransactionCreateDTO,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> TransactionResponseDTO:
    return transactionService.create(transaction_create, session, current_user)


@router.get(
    "/",
    response_model=list[TransactionResponseDTO],
    status_code=status.HTTP_200_OK
)
async def get_all(
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=10, le=100),
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> list[TransactionResponseDTO]:
    return transactionService.get_all(offset, limit, session, current_user)


@router.get(
    "/{id}",
    response_model=TransactionResponseDTO,
    status_code=status.HTTP_200_OK
)
async def get_by_id(
    id: int,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> TransactionResponseDTO:
    return transactionService.get_by_id(id, session, current_user)


@router.put(
    "/{id}",
    response_model=TransactionResponseDTO,
    status_code=status.HTTP_200_OK
)
async def update(
    id: int,
    transaction_update: TransactionUpdateDTO,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> TransactionResponseDTO:
    return transactionService.update(
        id,
        transaction_update,
        session,
        current_user
    )


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> None:
    return transactionService.delete(id, session, current_user)
