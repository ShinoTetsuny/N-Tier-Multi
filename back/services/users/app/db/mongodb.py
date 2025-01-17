from typing import Optional
import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

    @classmethod
    async def connect_to_database(cls):
        try:
            logging.info("Connecting to MongoDB...")
            cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
            cls.db = cls.client[settings.MONGODB_DB_NAME]
            
            # Vérifier la connexion
            await cls.client.admin.command('ping')
            logging.info("Successfully connected to MongoDB.")
            
            # Créer les index nécessaires
            await cls._create_indexes()
            
        except Exception as e:
            logging.error(f"Failed to connect to MongoDB: {str(e)}")
            raise

    @classmethod
    async def get_db(cls) -> AsyncIOMotorDatabase:
        """Get database instance"""
        if cls.db is None:
            await cls.connect_to_database()
        return cls.db

    @classmethod
    async def close_database_connection(cls):
        logging.info("Closing MongoDB connection...")
        if cls.client:
            cls.client.close()
            cls.db = None
            cls.client = None
            logging.info("MongoDB connection closed.")

    @classmethod
    async def _create_indexes(cls):
        """Crée les index nécessaires pour la base de données"""
        try:
            # Index unique sur l'email des utilisateurs
            await cls.db.users.create_index(
                "email",
                unique=True,
                background=True
            )
            
            # Index sur username pour les recherches rapides
            await cls.db.users.create_index(
                "username",
                background=True
            )
            
            # Index composé pour les recherches admin
            await cls.db.users.create_index(
                [
                    ("is_active", 1),
                    ("is_admin", 1)
                ],
                background=True
            )
            
            logging.info("Database indexes created successfully")
        except Exception as e:
            logging.error(f"Error creating database indexes: {str(e)}")
            raise
