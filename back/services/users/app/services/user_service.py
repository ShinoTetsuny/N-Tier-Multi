from datetime import datetime, timedelta
from typing import Optional, List
from bson import ObjectId
from fastapi import HTTPException, status

from app.core.auth import get_password_hash, verify_password, create_access_token
from app.core.config import settings
from app.models.user import UserInDB, UserCreate, PyObjectId
from app.models.schemas import UserUpdate, UserAdminUpdate
from app.core.exceptions import (
    UserNotFoundException,
    EmailAlreadyExistsException,
    InvalidCredentialsException
)
from app.db import get_database

class UserService:
    collection_name = "users"

    @classmethod
    async def get_collection(cls):
        db = await get_database()
        return db[cls.collection_name]

    @classmethod
    async def get_user_by_email(cls, email: str) -> Optional[UserInDB]:
        collection = await cls.get_collection()
        user_data = await collection.find_one({"email": email})
        if user_data:
            # Convertir _id en PyObjectId
            user_data["_id"] = PyObjectId(user_data["_id"])
            return UserInDB(**user_data)
        return None

    @classmethod
    async def get_user_by_id(cls, user_id: str) -> Optional[UserInDB]:
        try:
            collection = await cls.get_collection()
            user_data = await collection.find_one({"_id": ObjectId(user_id)})
            if user_data:
                # Convertir _id en PyObjectId
                user_data["_id"] = PyObjectId(user_data["_id"])
                return UserInDB(**user_data)
        except:
            raise UserNotFoundException()
        return None

    @classmethod
    async def create_user(cls, user_data: UserCreate) -> UserInDB:
        # Vérifier si l'email existe déjà
        if await cls.get_user_by_email(user_data.email):
            raise EmailAlreadyExistsException()

        collection = await cls.get_collection()
        
        # Créer le document utilisateur
        user_in_db = UserInDB(
            email=user_data.email,
            username=user_data.username,
            hashed_password=get_password_hash(user_data.password),
            is_active=True,
            is_admin=False,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        # Insérer dans la base de données
        result = await collection.insert_one(user_in_db.dict(by_alias=True))
        user_in_db.id = PyObjectId(result.inserted_id)
        return user_in_db

    @classmethod
    async def update_user(cls, user_id: PyObjectId, user_update: UserUpdate) -> UserInDB:
        try:
            # Obtenir une nouvelle connexion à la collection
            db = await get_database()
            collection = db[cls.collection_name]
            
            # Préparer les données de mise à jour
            update_data = user_update.dict(exclude_unset=True)
            if "password" in update_data:
                update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
            
            update_data["updated_at"] = datetime.utcnow()
            
            # Convertir en string pour la recherche MongoDB
            id_str = str(user_id)
            
            # Vérifier d'abord si l'utilisateur existe
            user = await collection.find_one({"_id": id_str})
            
            if not user:
                raise UserNotFoundException()
            
            # Faire la mise à jour avec l'id string
            result = await collection.find_one_and_update(
                {"_id": id_str},
                {"$set": update_data},
                return_document=True
            )

            if not result:
                raise UserNotFoundException()

            # Convertir _id en string pour la sérialisation
            result["_id"] = str(result["_id"])
            return UserInDB(**result)
            
        except Exception as e:
            print(f"Exception type: {type(e)}")
            print(f"Exception message: {str(e)}")
            raise

    @classmethod
    async def delete_user(cls, user_id: PyObjectId) -> bool:
        try:
            collection = await cls.get_collection()
            
            # Convertir en string pour la recherche MongoDB
            id_str = str(user_id)
            
            result = await collection.delete_one({"_id": id_str})
            
            if result.deleted_count == 0:
                raise UserNotFoundException()
            
            return True
            
        except Exception as e:
            print(f"Exception type: {type(e)}")
            print(f"Exception message: {str(e)}")
            raise

    @classmethod
    async def get_all_users(cls) -> List[UserInDB]:
        collection = await cls.get_collection()
        users = []
        async for user in collection.find():
            users.append(UserInDB(**user))
        return users

    @classmethod
    async def authenticate_user(cls, email: str, password: str) -> tuple[UserInDB, str]:
        user = await cls.get_user_by_email(email)
        if not user:
            raise InvalidCredentialsException()
        if not verify_password(password, user.hashed_password):
            raise InvalidCredentialsException()
        
        access_token = cls.create_access_token(user)
        return user, access_token

    @staticmethod
    def create_access_token(user: UserInDB) -> str:
        token_data = {
            "sub": user.email,  # sub est un standard JWT pour le sujet du token
            "userId": str(user.id),
            "email": user.email,
            "role": "admin" if user.is_admin else "user"
        }
        return create_access_token(token_data)

    @classmethod
    async def create_admin_user(cls, email: str, password: str, username: str) -> UserInDB:
        # Vérifier si l'admin existe déjà
        existing_admin = await cls.get_user_by_email(email)
        if existing_admin:
            return existing_admin

        collection = await cls.get_collection()
        
        # Créer l'administrateur
        admin_user = UserInDB(
            email=email,
            username=username,
            hashed_password=get_password_hash(password),
            is_active=True,
            is_admin=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        result = await collection.insert_one(admin_user.dict(by_alias=True))
        admin_user.id = PyObjectId(result.inserted_id)
        return admin_user

    @classmethod
    async def update_user_admin(cls, user_id: str, user_update: UserAdminUpdate) -> UserInDB:
        collection = await cls.get_collection()
        
        update_data = user_update.dict(exclude_unset=True)
        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
        update_data["updated_at"] = datetime.utcnow()

        result = await collection.find_one_and_update(
            {"_id": ObjectId(user_id)},
            {"$set": update_data},
            return_document=True
        )

        if not result:
            raise UserNotFoundException()

        return UserInDB(**result)