from pydantic_settings import BaseSettings
from typing import Optional
from functools import lru_cache

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "User Management Service"
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # MongoDB
    MONGODB_URL: str
    MONGODB_DB_NAME: str = "user_management"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]  # Frontend URL
    
    # Admin user
    FIRST_SUPERUSER_EMAIL: str
    FIRST_SUPERUSER_PASSWORD: str
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()