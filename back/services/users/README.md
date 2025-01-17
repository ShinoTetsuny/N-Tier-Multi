# Service de Gestion des Utilisateurs

Service backend Python fonctionnant sur le port 3003 pour la gestion des utilisateurs.

## Fonctionnalités

- Authentification des utilisateurs (connexion)
- Inscription des utilisateurs
- Gestion des profils utilisateurs (consultation/modification/suppression)
- Stockage des informations utilisateurs dans MongoDB

## Dépendances

- FastAPI - Framework web
- MongoDB - Base de données
- PyJWT - Gestion des tokens JWT
- bcrypt - Hachage des mots de passe
- Motor - Client MongoDB asynchrone

## Schéma Utilisateur

| Champ | Description |
|-------|-------------|
| email | Adresse email de l'utilisateur |
| username | Nom d'affichage de l'utilisateur |
| hashed_password | Mot de passe haché |
| is_admin | Statut administrateur (true/false) |
| is_active | Compte actif ou non |
| created_at | Horodatage de création du compte |
| updated_at | Horodatage de dernière mise à jour |

## Points d'API

### Points d'API Utilisateur

| Méthode | Endpoint | Corps | Description |
|--------|----------|------|-------------|
| POST | /api/v1/auth/login | {email, password} | Authentifie l'utilisateur et retourne un token JWT |
| POST | /api/v1/auth/register | {email, username, password} | Crée un nouveau compte utilisateur |
| GET | /api/v1/users/me | JWT requis | Obtient les informations du profil utilisateur |
| PUT | /api/v1/users/me | JWT requis | Met à jour le profil utilisateur |
| DELETE | /api/v1/users/me | JWT requis | Supprime le compte utilisateur |

### Points d'API Administrateur

| Méthode | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/v1/admin/users | JWT admin requis | Obtient tous les utilisateurs |
| GET | /api/v1/admin/users/{id} | JWT admin requis | Obtient un utilisateur par ID |
| PUT | /api/v1/admin/users/{id} | JWT admin requis | Met à jour un utilisateur |
| DELETE | /api/v1/admin/users/{id} | JWT admin requis | Supprime un utilisateur par ID |

Architecture:

back/services/users/
├── app/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py          # Routes d'authentification
│   │   │   ├── users.py         # Routes utilisateurs
│   │   │   └── admin.py         # Routes admin
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py            # Configuration (env vars, settings)
│   │   ├── security.py          # JWT, hashing, etc.
│   │   └── exceptions.py        # Custom exceptions
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # Modèle utilisateur
│   │   └── schemas.py          # Schémas Pydantic
│   ├── services/
│   │   ├── __init__.py
│   │   └── user_service.py     # Logique métier
│   └── db/
│       ├── __init__.py
│       └── mongodb.py          # Configuration MongoDB
├── tests/
│   ├── __init__.py
│   ├── conftest.py            # Fixtures pytest
│   ├── test_auth.py
│   └── test_users.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── README.md