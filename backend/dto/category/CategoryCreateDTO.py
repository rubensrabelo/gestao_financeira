from pydantic import BaseModel


class CategoryCreateDTO(BaseModel):
    name: str
