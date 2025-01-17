# Version of the API
__version__ = "1.0.0"

# Import for easier access
from app.core import security
from app.models import schemas
from app.services.user_service import UserService

__all__ = [
    "security",
    "schemas",
    "UserService",
]