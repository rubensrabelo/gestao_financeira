from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.CategoryModel import CategoryModel
    from models.TransactionModel import TransactionModel


class UserBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    firstname: str = Field(max_length=50)
    lastname: str = Field(max_length=50)
    email: str = Field(unique=True)
    password: str = Field(..., min_length=6, max_length=72)
    active: bool = Field(default=True)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class UserModel(UserBase, table=True):
    __tablename__ = "tb_user"

    categories: set["CategoryModel"] = Relationship(
        back_populates="user", sa_relationship=relationship(
            "CategoryModel", collection_class=set
        )
    )
    transactions: list["TransactionModel"] = Relationship(
        back_populates="user"
    )
