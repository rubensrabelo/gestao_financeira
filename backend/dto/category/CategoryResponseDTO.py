from pydantic import BaseModel


class CategoryResponseDTO(BaseModel):
    id: int | None
    name: str
