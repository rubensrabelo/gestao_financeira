from pydantic import BaseModel
from datetime import date, datetime

from ...models.enums.TypeEnum import TypeEnum


class TransactionResponseDTO(BaseModel):
    id: int
    type: TypeEnum
    amount: float
    transaction_date: date
    created_at: datetime
    updated_at: datetime
