from fastapi import APIRouter

from .routes import (
    user_router,
    auth_router,
    category_router,
    transaction_router,
    report_router
)

api_router = APIRouter()

api_router.include_router(user_router, prefix="/users", tags=["Users"])

api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])

api_router.include_router(
    category_router, prefix="/categories", tags=["Categories"]
)

api_router.include_router(
    transaction_router, prefix="/transactions", tags=["Transactions"]
)

api_router.include_router(
    report_router, prefix="/reports", tags=["Reports"]
)
