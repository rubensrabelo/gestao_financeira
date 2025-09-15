from pydantic import BaseModel


class MonthlyComparison(BaseModel):
    current_month: str
    previous_month: str
    income_current: float
    income_previous: float
    expenses_current: float
    expenses_previous: float
    balance_current: float
    balance_previous: float


class CategoryHighlight(BaseModel):
    category: str
    growth_value: float


class ComparisonResponse(BaseModel):
    summary: MonthlyComparison
    highlight_category: CategoryHighlight | None
