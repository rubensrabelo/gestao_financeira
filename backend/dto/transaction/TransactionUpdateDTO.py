from pydantic import BaseModel
from sqlmodel import Field
from datetime import date

from ...models.enums.TypeEnum import TypeEnum


class TransactionUpdateDTO(BaseModel):
    transaction_date: date
    type: TypeEnum
    amount: float = Field(ge=0)
