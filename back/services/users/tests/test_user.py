import pytest
from fastapi import status

async def test_get_current_user(test_client, test_user, user_token):
    response = await test_client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {user_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["email"] == test_user.email

async def test_update_user(test_client, user_token):
    update_data = {
        "username": "updated_username"
    }
    
    response = await test_client.put(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {user_token}"},
        json=update_data
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["username"] == "updated_username"

async def test_delete_user(test_client, user_token):
    response = await test_client.delete(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {user_token}"}
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT