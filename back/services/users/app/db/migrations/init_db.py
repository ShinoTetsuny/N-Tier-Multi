import asyncio
import logging
from app.db.mongodb import MongoDB
from app.core.config import settings
from app.services.user_service import UserService

async def init_db():
    """Initialise la base de données avec les données nécessaires"""
    try:
        # Connexion à la base de données
        db = await MongoDB.get_db()
        
        # Création du premier super utilisateur si nécessaire
        admin_user = await UserService.get_user_by_email(settings.FIRST_SUPERUSER_EMAIL)
        if not admin_user:
            await UserService.create_admin_user(
                email=settings.FIRST_SUPERUSER_EMAIL,
                password=settings.FIRST_SUPERUSER_PASSWORD,
                username="admin"
            )
            logging.info("Super user created successfully")
        
        logging.info("Database initialized successfully")
        
    except Exception as e:
        logging.error(f"Error initializing database: {str(e)}")
        raise
    finally:
        await MongoDB.close_database_connection()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(init_db())