from pydantic import BaseModel
from sqlmodel import Field


class UserCreateDTO(BaseModel):
    firstname: str = Field(max_length=50)
    lastname: str = Field(max_length=50)
    email: str = Field(unique=True)
    password: str
