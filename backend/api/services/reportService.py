from sqlmodel import Session, select, func

from schemas.summarySchema import SummaryResponse
from schemas.balanceTimelineSchema import BalancePoint, BalanceTimelineResponse
from models.UserModel import UserModel
from models.TransactionModel import TransactionModel
from models.enums.TypeEnum import TypeEnum


def _build_transaction_query(
    session: Session,
    user_id: int,
    month: int | None = None,
    year: int | None = None
):
    query = select(TransactionModel).where(
        TransactionModel.user_id == user_id
    )

    if month and year:
        query = query.where(
            func.extract("month", TransactionModel.transaction_date) == month,
            func.extract("year", TransactionModel.transaction_date) == year
        )
    elif year:
        query = query.where(
            func.extract("year", TransactionModel.transaction_date) == year
        )

    return session.exec(query).all()


def get_summary(
        session: Session,
        current_user: UserModel,
        month: int | None = None,
        year: int | None = None,
) -> SummaryResponse:
    results = _build_transaction_query(
        session,
        current_user.id,
        month,
        year
    )

    total_income = sum(
        t.amount
        for t in results
        if t.type == TypeEnum.INCOME.value
    )
    total_expenses = sum(
        t.amount
        for t in results
        if t.type == TypeEnum.EXPENSE.value
    )
    balance = total_income - total_expenses

    return SummaryResponse(
        total_income=total_income,
        total_expenses=total_expenses,
        balance=balance
    )


def get_balance_timeline(
        session: Session,
        current_user: UserModel,
        month: int | None = None,
        year: int | None = None,
) -> BalanceTimelineResponse:
    results = _build_transaction_query(
        session,
        current_user.id,
        month,
        year
    )
    results.sort(key=lambda t: t.transaction_date)

    timeline = []
    balance = 0

    for t in results:
        if t.type == TypeEnum.INCOME.value:
            balance += t.amount
        elif t.type == TypeEnum.EXPENSE.value:
            balance += t.amount
        timeline.append(BalancePoint(date=t.transaction_date, balance=balance))

    return BalanceTimelineResponse(timeline)
