from sqlmodel import Session, select, func

from schemas.summarySchema import (
    SummaryResponse,
    MonthlySummary,
    MonthlySummaryResponse
)
from schemas.balanceTimelineSchema import BalancePoint, BalanceTimelineResponse
from schemas.ExpenseByCategorySchema import (
    CategoryExpense,
    ExpenseReportResponse
)
from models.UserModel import UserModel
from models.TransactionModel import TransactionModel
from models.CategoryModel import CategoryModel
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


def get_monthly_summary(
        session: Session,
        current_user: UserModel,
        year: int | None = None
) -> MonthlySummaryResponse:
    query = (
        select(
            func.extract(
                "year", TransactionModel.transaction_date
            ).label("year"),
            func.extract(
                "month", TransactionModel.transaction_date
            ).label("month"),
            TransactionModel.type,
            func.sum(TransactionModel.amount).label("total")
        )
        .where(TransactionModel.user_id == current_user.id)
        .group_by("year", "month", TransactionModel.type)
        .order_by("year", "month")
    )

    if year:
        query = query.where(
            func.extract("year", TransactionModel.transaction_date) == year
        )

    results = session.exec(query).all()

    summary_map: dict[tuple[int, int], dict[str, float]] = {}

    for row in results:
        ym = (int(row.year), int(row.month))
        if ym not in summary_map:
            summary_map[ym] = {"income": 0, "expenses": 0}

        if row.type == TypeEnum.INCOME.value:
            summary_map[ym]["income"] = row.total
        elif row.type == TypeEnum.EXPENSE.value:
            summary_map[ym]["expenses"] = row.total

    monthly_data = []
    for (year, month), values in sorted(summary_map.items()):
        balance = values["income"] - values["expenses"]
        monthly_data.append(
            MonthlySummary(
                month=f"{year}-{month:02d}",
                income=values["income"],
                expenses=values["expenses"],
                balance=balance
            )
        )

    return MonthlySummaryResponse(data=monthly_data)


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


def get_expenses_by_category(
        session: Session,
        current_user: UserModel
) -> ExpenseReportResponse:
    stmt = (
        select(
            CategoryModel.name,
            func.sum(TransactionModel.amount).label("total")
        )
        .join(
            TransactionModel,
            TransactionModel.category_id == CategoryModel.id
        )
        .where(
            TransactionModel.type == TypeEnum.EXPENSE.value,
            TransactionModel.user_id == current_user.id
        )
        .group_by(CategoryModel.name)
    )

    result = session.exec(stmt).all()

    if not result:
        return ExpenseReportResponse(categories=[])

    total_expenses = sum(row.total for row in result)

    categories = [
        CategoryExpense(
            category=row.name,
            total=row.total,
            percentage=(row.total / total_expenses) * 100
            if total_expenses > 0 else 0
        )
        for row in sorted(result, key=lambda x: x.total, reverse=True)
    ]

    return ExpenseReportResponse(categories=categories)
