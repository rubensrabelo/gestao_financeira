from .userRouter import router as user_router
from .authRouter import router as auth_router
from .categoryRouter import router as category_router

__all__ = [
    "user_router",
    "auth_router",
    "category_router"
]
