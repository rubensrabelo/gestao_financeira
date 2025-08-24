from datetime import datetime, timezone
from fastapi import HTTPException
from sqlmodel import Session, select
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from starlette import status

from models.TransactionModel import TransactionModel
from models.CategoryModel import CategoryModel
from models.UserModel import UserModel
from dto.transaction import (
    TransactionCreateDTO, TransactionUpdateDTO, TransactionResponseDTO
)


def create(
    transaction_create: TransactionCreateDTO,
    session: Session,
    current_user: UserModel
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


def get_all(
    offset: int,
    limit: int,
    session: Session,
    current_user: UserModel
) -> list[TransactionResponseDTO]:
    statement = (
        select(TransactionModel)
        .where(TransactionModel.user_id == current_user.id)
        .options(joinedload(TransactionModel.category))
        .order_by(desc(TransactionModel.transaction_date))
        .offset(offset)
        .limit(limit)
    )
    return session.exec(statement).all()


def get_by_id(
    id: int,
    session: Session,
    current_user: UserModel
) -> TransactionResponseDTO:
    transaction = session.get(TransactionModel, id)
    if not transaction or transaction.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    return transaction


def update(
    id: int,
    transaction_update: TransactionUpdateDTO,
    session: Session,
    current_user: UserModel
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


def delete(
    id: int,
    session: Session,
    current_user: UserModel
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
