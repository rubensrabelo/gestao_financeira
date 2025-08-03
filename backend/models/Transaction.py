from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from datetime import date, datetime, timezone

from enums.TypeEnum import TypeEnum

if TYPE_CHECKING:
    from User import User
    from Category import Category


class TransactionBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    type: TypeEnum
    amount: float
    transaction_date: date
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class Transaction(TransactionBase, table=True):
    user_id: int = Field(foreign_key="user.id")
    category_id: int = Field(foreign_key="category.id")

    user: "User" = Relationship(back_populates="transactions")
    category: "Category" = Relationship(back_populates="transactions")
