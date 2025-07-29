from pydantic import BaseModel
from sqlmodel import Field


class UserUpdateDTO(BaseModel):
    firstname: str = Field(max_length=50)
    lastname: str = Field(max_length=50)
    email: str | None = Field(default=None, unique=True)
    password: str | None = None
