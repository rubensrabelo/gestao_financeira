from sqlmodel import SQLModel, Field
from datetime import datetime, timezone


class CategoryBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(name=50)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class Category(CategoryBase, table=True):
    ...
