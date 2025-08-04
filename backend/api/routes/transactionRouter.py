from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from starlette import status
from datetime import datetime, timezone

from database import get_session
from models.TransactionModel import TransactionModel
from models.CategoryModel import CategoryModel
from models.UserModel import UserModel
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
    current_user: UserModel = Depends(get_current_user)
) -> TransactionResponseDTO:
    if transaction_create.category_id:
        category = session.get(CategoryModel, transaction_create.category_id)
        if not category or category.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid category for this user"
            )

    transaction = TransactionModel(
        **transaction_create.model_dump(),
        user_id=current_user.id
    )
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


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
    statement = (
        select(TransactionModel)
        .where(TransactionModel.user_id == current_user.id)
        .offset(offset)
        .limit(limit)
    )
    return session.exec(statement).all()


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
    transaction = session.get(TransactionModel, id)
    if not transaction or transaction.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    return transaction


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
    transaction = session.get(TransactionModel, id)
    if not transaction or transaction.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    if transaction_update.category_id:
        category = session.get(CategoryModel, transaction_update.category_id)
        if not category or category.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid category for this user"
            )

    for key, value in (
        transaction_update.model_dump(exclude_unset=True).items()
    ):
        setattr(transaction, key, value)

    transaction.updated_at = datetime.now(timezone.utc)

    session.add(transaction)
    session.commit()
    session.refresh(transaction)

    return transaction


@router.delete(
        "/{id}",
        status_code=status.HTTP_204_NO_CONTENT
)
async def delete(
    id: int,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> None:
    transaction = session.get(TransactionModel, id)
    if not transaction or transaction.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    transaction.active = False
    transaction.updated_at = datetime.now(timezone.utc)

    session.add(transaction)
    session.commit()
