from fastapi import APIRouter

from .routes.userRouter import router as user_router
from .routes.authRouter import router as auth_router

api_router = APIRouter()

api_router.include_router(user_router, prefix="/users", tags=["User"])
api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
