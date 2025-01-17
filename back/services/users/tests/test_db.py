import pytest
from app.db.mongodb import MongoDB
from motor.motor_asyncio import AsyncIOMotorClient

async def test_database_connection():
    await MongoDB.connect_to_database()
    assert isinstance(MongoDB.client, AsyncIOMotorClient)
    assert MongoDB.db is not None
    await MongoDB.close_database_connection()

async def test_database_indexes(test_db):
    indexes = await test_db.users.index_information()
    assert "email_1" in indexes  # Vérifie l'index unique sur email