from typing import Optional
from pydantic import BaseModel, EmailStr, Field, constr
from datetime import datetime
from bson import ObjectId
from .user import UserBase, PyObjectId

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    username: constr(min_length=3, max_length=50)
    password: constr(min_length=8)

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[constr(min_length=3, max_length=50)] = None
    password: Optional[constr(min_length=8)] = None

class UserResponse(UserBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

# Admin Schemas
class UserAdminUpdate(UserUpdate):
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None

class UserAdminCreate(UserCreate):
    is_active: bool = True
    is_admin: bool = False

# Response Models
class ResponseModel(BaseModel):
    status: str
    message: str
    data: Optional[dict] = None

# Error Models
class ErrorModel(BaseModel):
    detail: str