from .mongodb import MongoDB

async def get_database():
    """Fonction utilitaire pour obtenir l'instance de la base de données"""
    return await MongoDB.get_db()

__all__ = ["MongoDB", "get_database"]