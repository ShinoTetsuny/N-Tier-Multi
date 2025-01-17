from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user
from app.models.schemas import UserUpdate, UserResponse
from app.services.user_service import UserService
from app.models.user import User, UserInDB

router = APIRouter()

@router.get("/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_user)) -> User:
    return User.from_user_in_db(current_user)

@router.put("/me", response_model=UserResponse)
async def update_user_me(
    user_update: UserUpdate,
    current_user = Depends(get_current_user)
):
    updated_user = await UserService.update_user(current_user.id, user_update)
    return updated_user

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_me(current_user = Depends(get_current_user)):
    await UserService.delete_user(current_user.id)
    return {"detail": "User deleted successfully"}