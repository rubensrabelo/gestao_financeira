from .userRouter import router as user_router
from .authRouter import router as auth_router
from .categoryRouter import router as category_router
from .transactionRouter import router as transaction_router
from .reportRouter import router as report_router

__all__ = [
    "user_router",
    "auth_router",
    "category_router",
    "transaction_router",
    "report_router",
]
