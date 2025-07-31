from pydantic import BaseModel


class CategoryUpdateDTO(BaseModel):
    name: str
