from pydantic import BaseModel, Field
from datetime import date

from models.enums.TypeEnum import TypeEnum


class TransactionCreateDTO(BaseModel):
    transaction_date: date
    type: TypeEnum
    amount: float = Field(ge=0)
    category_id: int
