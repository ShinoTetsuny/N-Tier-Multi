import pytest
from fastapi import status
from app.models.schemas import UserCreate

async def test_register_user(test_client, test_db):
    user_data = {
        "email": "newuser@example.com",
        "username": "newuser",
        "password": "password123"
    }
    
    response = await test_client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == status.HTTP_201_CREATED
    assert "access_token" in response.json()

async def test_login_user(test_client, test_user):
    login_data = {
        "username": test_user.email,
        "password": "testpassword123"
    }
    
    response = await test_client.post(
        "/api/v1/auth/login",
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert "access_token" in response.json()

async def test_login_invalid_credentials(test_client):
    login_data = {
        "username": "wrong@example.com",
        "password": "wrongpassword"
    }
    
    response = await test_client.post(
        "/api/v1/auth/login",
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED