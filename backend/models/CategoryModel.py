from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

if TYPE_CHECKING:
    from models.UserModel import UserModel
    from models.TransactionModel import TransactionModel


class CategoryBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=50)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class CategoryModel(CategoryBase, table=True):
    user_id: int = Field(foreign_key="user.id")
    user: "UserModel" = Relationship(back_populates="categories")
    transactions: list["TransactionModel"] = Relationship(
        back_populates="category"
    )
