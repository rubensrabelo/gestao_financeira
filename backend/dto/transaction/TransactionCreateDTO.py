from pydantic import BaseModel
from sqlmodel import Field
from datetime import date

from ...models.enums.TypeEnum import TypeEnum


class TransactionCreateDTO(BaseModel):
    type: TypeEnum
    amount: float = Field(ge=0)
    transaction_date: date
