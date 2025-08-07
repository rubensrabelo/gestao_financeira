from pydantic import BaseModel
from datetime import date, datetime

from models.enums.TypeEnum import TypeEnum
from dto.category.CategoryResponseDTO import CategoryResponseDTO


class TransactionResponseDTO(BaseModel):
    id: int
    transaction_date: date
    type: TypeEnum
    amount: float
    active: bool
    category: CategoryResponseDTO
    user_id: int
    created_at: datetime
    updated_at: datetime
