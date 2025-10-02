from pydantic import BaseModel, Field


class UserUpdateDTO(BaseModel):
    firstname: str = Field(max_length=50)
    lastname: str = Field(max_length=50)
    email: str | None = Field(default=None, unique=True)
    password: str | None = Field(default=None, min_length=6, max_length=72)
