from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone


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
    ...
