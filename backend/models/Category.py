from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

if TYPE_CHECKING:
    from User import User


class CategoryBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=50)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class Category(CategoryBase, table=True):
    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="categories")
