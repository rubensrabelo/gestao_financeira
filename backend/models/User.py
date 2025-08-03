from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from Category import Category


class UserBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    firstname: str = Field(max_length=50)
    lastname: str = Field(max_length=50)
    email: str = Field(unique=True)
    password: str
    active: bool = Field(default=True)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class User(UserBase, table=True):
    categories: set["Category"] = Relationship(
        back_populates="user",
        sa_relationship=relationship(
            "Category",
            collection_class=set
        )
    )
