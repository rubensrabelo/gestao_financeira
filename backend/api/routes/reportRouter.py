from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from schemas.summarySchema import SummaryResponse, MonthlySummaryResponse
from schemas.balanceTimelineSchema import BalanceTimelineResponse
from schemas.ExpenseByCategorySchema import ExpenseReportResponse
from models.UserModel import UserModel
from middleware.auth import get_current_user
from database import get_session
from api.services import reportService

router = APIRouter()


@router.get("/summary", response_model=SummaryResponse)
async def summary(
    month: int | None = Query(default=None, ge=1, le=12),
    year: int | None = None,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user),
) -> SummaryResponse:
    return reportService.get_summary(session, current_user, month, year)


@router.get("/monthly-summary", response_model=MonthlySummaryResponse)
def monthly_summary(
    year: int | None = None,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> MonthlySummaryResponse:
    return reportService.get_monthly_summary(session, current_user, year)


@router.get("/balance-timeline", response_model=BalanceTimelineResponse)
async def balance_timeline(
    month: int | None = Query(default=None, ge=1, le=12),
    year: int | None = None,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user),
) -> BalanceTimelineResponse:
    return reportService.get_balance_timeline(
        session=session,
        current_user=current_user,
        month=month,
        year=year,
    )


@router.get("/expenses/by-category", response_model=ExpenseReportResponse)
def expenses_by_category(
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user),
) -> ExpenseReportResponse:
    return reportService.get_expenses_by_category(session, current_user)
