import pytest
from fastapi import status

async def test_get_all_users(test_client, admin_token, test_user):
    response = await test_client.get(
        "/api/v1/admin/users",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) > 0

async def test_admin_delete_user(test_client, admin_token, test_user):
    response = await test_client.delete(
        f"/api/v1/admin/users/{test_user.id}",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT

async def test_non_admin_access_denied(test_client, user_token):
    response = await test_client.get(
        "/api/v1/admin/users",
        headers={"Authorization": f"Bearer {user_token}"}
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN