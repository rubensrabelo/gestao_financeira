from datetime import datetime
from pydantic import BaseModel


class UserCreateDTO(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: str
    created_at: datetime
    updated_at: datetime
