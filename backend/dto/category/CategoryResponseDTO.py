from datetime import datetime
from pydantic import BaseModel


class CategoryBase(BaseModel):
    id: int | None
    name: str
    created_at: datetime
    updated_at: datetime
