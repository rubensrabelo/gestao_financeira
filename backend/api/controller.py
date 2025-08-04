from fastapi import APIRouter

from .routes import (
    user_router, auth_router, category_router, transaction_router
)

api_router = APIRouter()

api_router.include_router(user_router, prefix="/users", tags=["User"])

api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])

api_router.include_router(
    category_router, prefix="/categories", tags=["Category"]
)

api_router.include_router(
    transaction_router, prefix="/transactions", tags=["Transaction"]
)
