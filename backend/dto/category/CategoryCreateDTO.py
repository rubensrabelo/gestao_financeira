from pydantic import BaseModel
from sqlmodel import Field


class CategoryCreateDTO(BaseModel):
    name: str = Field(max_length=50)
