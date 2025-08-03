from pydantic import BaseModel
from datetime import date, datetime

from ...models.enums.TypeEnum import TypeEnum


class TransactionResponseDTO(BaseModel):
    id: int
    transaction_date: date
    type: TypeEnum
    amount: float
    created_at: datetime
    updated_at: datetime
