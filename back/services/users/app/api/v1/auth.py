from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.services.user_service import UserService
from app.models.schemas import UserCreate, Token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends()
) -> dict:
    user, access_token = await UserService.authenticate_user(form_data.username, form_data.password)
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/register", response_model=Token)
async def register(user_data: UserCreate):
    user = await UserService.get_user_by_email(user_data.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    user = await UserService.create_user(user_data)
    access_token = UserService.create_access_token(user)
    return {"access_token": access_token, "token_type": "bearer"}