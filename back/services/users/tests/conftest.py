import pytest
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.testclient import TestClient
from datetime import datetime
from bson import ObjectId

from app.main import app
from app.core.config import settings
from app.db.mongodb import MongoDB
from app.services.user_service import UserService

@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="session")
async def test_client():
    # Configuration de la base de données de test
    settings.MONGODB_DB_NAME = "test_db"
    
    # Connexion à la base de test
    await MongoDB.connect_to_database()
    
    # Client de test
    with TestClient(app) as client:
        yield client
    
    # Nettoyage de la base de test
    await MongoDB.client.drop_database(settings.MONGODB_DB_NAME)
    await MongoDB.close_database_connection()

@pytest.fixture(scope="function")
async def test_db():
    # Obtenir la base de données de test
    db = await MongoDB.get_db()
    
    yield db
    
    # Nettoyage après chaque test
    collections = await db.list_collection_names()
    for collection in collections:
        await db[collection].delete_many({})

@pytest.fixture
async def test_user():
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword123"
    }
    user = await UserService.create_user(UserCreate(**user_data))
    return user

@pytest.fixture
async def test_admin():
    admin_data = {
        "email": "admin@example.com",
        "username": "admin",
        "password": "adminpass123"
    }
    admin = await UserService.create_admin_user(**admin_data)
    return admin

@pytest.fixture
async def admin_token(test_admin):
    return UserService.create_access_token(data={"sub": test_admin.email})

@pytest.fixture
async def user_token(test_user):
    return UserService.create_access_token(data={"sub": test_user.email})