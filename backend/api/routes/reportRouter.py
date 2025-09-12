from fastapi import APIRouter, Depends
from sqlmodel import Session

from schemas.summarySchema import SummaryResponse
from models.UserModel import UserModel
from middleware.auth import get_current_user
from database import get_session
from api.services import reportService

router = APIRouter()


@router.get("/summary", response_model=SummaryResponse)
async def summary(
    month: int | None = None,
    year: int | None = None,
    session: Session = Depends(get_session),
    current_user: UserModel = Depends(get_current_user)
) -> SummaryResponse:
    return reportService.get_summary(session, current_user, month, year)
