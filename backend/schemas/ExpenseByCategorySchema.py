from pydantic import BaseModel


class CategoryExpense(BaseModel):
    category: str
    total: float
    percentage: float


class ExpenseReportResponse(BaseModel):
    categories: list[CategoryExpense]
