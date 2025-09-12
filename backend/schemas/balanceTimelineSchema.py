from datetime import date
from pydantic import BaseModel
from typing import List


class BalancePoint(BaseModel):
    date: date
    balance: float


class BalanceTimelineResponse(BaseModel):
    timeline: List[BalancePoint]
