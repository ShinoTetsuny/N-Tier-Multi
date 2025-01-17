from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.core.security import get_current_user, check_admin_privileges
from app.models.schemas import UserResponse
from app.services.user_service import UserService

router = APIRouter()

@router.get(
    "/users",
    response_model=List[UserResponse],
    dependencies=[Depends(check_admin_privileges)]
)
async def get_all_users():
    return await UserService.get_all_users()

@router.get(
    "/users/{user_id}",
    response_model=UserResponse,
    dependencies=[Depends(check_admin_privileges)]
)
async def get_user_by_id(user_id: str):
    user = await UserService.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.delete(
    "/users/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(check_admin_privileges)]
)
async def delete_user(user_id: str):
    user = await UserService.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    await UserService.delete_user(user_id)
    return {"detail": "User deleted successfully"}