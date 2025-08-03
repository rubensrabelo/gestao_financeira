from pydantic import BaseModel
from sqlmodel import Field


class CategoryUpdateDTO(BaseModel):
    name: str = Field(max_length=50)
