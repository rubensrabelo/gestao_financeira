from pydantic import BaseModel


class SummaryResponse(BaseModel):
    total_income: float
    total_expenses: float
    balance: float


class MonthlySummary(BaseModel):
    month: str   # ex.: "2025-09"
    income: float
    expenses: float
    balance: float


class MonthlySummaryResponse(BaseModel):
    data: list[MonthlySummary]
