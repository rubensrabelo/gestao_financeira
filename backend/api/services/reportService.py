from sqlmodel import Session, select, func

from schemas.summarySchema import SummaryResponse
from models.UserModel import UserModel
from models.TransactionModel import TransactionModel
from models.enums import TypeEnum


def get_summary(
        session: Session,
        current_user: UserModel,
        month: int | None = None,
        year: int | None = None,
) -> SummaryResponse:
    query = select(TransactionModel)

    if month and year:
        query = query.where(
            func.extract("month", TransactionModel.transaction_date) == month,
            func.extract("year", TransactionModel.transaction_date) == year
        )
    elif year:
        query = query.where(
            func.extract("year", TransactionModel.transaction_date) == year
        )

    query = query.where(TransactionModel.user_id == current_user.id)

    results = session.exec(query).all()

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
