from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, EmailStr, Field, ConfigDict, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import CoreSchema, core_schema
from bson import ObjectId

class PyObjectId:
    def __init__(self, oid: Any = None):
        self._oid = ObjectId(oid) if oid else ObjectId()

    @property
    def oid(self) -> ObjectId:
        return self._oid

    def __str__(self) -> str:
        return str(self._oid)

    def __eq__(self, other: Any) -> bool:
        if isinstance(other, (PyObjectId, ObjectId, str)):
            return str(self) == str(other)
        return False

    @classmethod
    def __get_pydantic_core_schema__(
        cls,
        _source_type: Any,
        _handler: Any
    ) -> CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.is_instance_schema(cls),
                core_schema.str_schema(serialization=core_schema.str_schema()),
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x.oid if isinstance(x, PyObjectId) else x)
            ),
        )

class UserBase(BaseModel):
    email: EmailStr
    username: str
    is_active: bool = True
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )
    
    id: Optional[PyObjectId] = Field(default_factory=ObjectId, alias="_id")
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class User(UserBase):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )
    
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_user_in_db(cls, user_in_db: UserInDB) -> "User":
        return cls(
            _id=str(user_in_db.id),
            email=user_in_db.email,
            username=user_in_db.username,
            is_active=user_in_db.is_active,
            is_admin=user_in_db.is_admin,
            created_at=user_in_db.created_at,
            updated_at=user_in_db.updated_at
        )
