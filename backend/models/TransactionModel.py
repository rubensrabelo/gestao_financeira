from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from datetime import date, datetime, timezone

from .enums.TypeEnum import TypeEnum

if TYPE_CHECKING:
    from models.UserModel import UserModel
    from models.CategoryModel import CategoryModel


class TransactionBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    transaction_date: date
    type: TypeEnum
    amount: float = Field(ge=0)
    active: bool = Field(default=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class TransactionModel(TransactionBase, table=True):
    __tablename__ = "tb_transaction"

    category_id: int = Field(foreign_key="tb_category.id")
    user_id: int = Field(foreign_key="tb_user.id")

    category: "CategoryModel" = Relationship(back_populates="transactions")
    user: "UserModel" = Relationship(back_populates="transactions")
