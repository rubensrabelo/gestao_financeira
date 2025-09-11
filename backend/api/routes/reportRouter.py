from fastapi import APIRouter, Depends
from sqlmodel import Session

from schemas.summarySchema import SummaryResponse
from database import get_session
from api.services import reportService

router = APIRouter()


@router.get("/summary", response_model=SummaryResponse)
async def summary(
    month: int | None = None,
    year: int | None = None,
    session: Session = Depends(get_session)
) -> SummaryResponse:
    ...
