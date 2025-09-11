from pydantic import BaseModel


class SummaryResponse(BaseModel):
    total_income: float
    total_expenses: float
    balance: float
