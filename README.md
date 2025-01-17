# Service de Gestion des Produits - Microservice Architecture

Ce projet fait partie d'une architecture microservices plus large et gère spécifiquement les produits. Il permet la création, la lecture, la mise à jour et la suppression (CRUD) de produits, avec support pour les images et mise en cache Redis.

## 🚀 Fonctionnalités

- CRUD complet pour les produits
- Authentification via JWT
- Upload d'images
- Cache avec Redis
- Tests unitaires
- Validation des données

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- Redis (optionnel, pour le cache)
- npm ou yarn

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone <url-du-repo>
cd back/services/products
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet :
```env
MONGODB_URI=mongodb://localhost:27017/products
PORT=3002
JWT_SECRET=votre_secret_jwt_tres_long_et_complexe
REDIS_URL=redis://localhost:6379
```

4. **Créer le dossier uploads**
```bash
mkdir uploads
```

## 🚀 Démarrage

1. **Démarrer le serveur en mode développement**
```bash
npm start
```

2. **Générer un token de test**
```bash
node utils/generateTestToken.js
```

## 📝 API Endpoints

### Produits

- **GET** `/products` - Récupérer tous les produits
- **GET** `/products/:id` - Récupérer un produit spécifique
- **POST** `/products` - Créer un nouveau produit
- **PATCH** `/products/:id` - Mettre à jour un produit
- **DELETE** `/products/:id` - Supprimer un produit

### Format des requêtes

#### Créer un produit
```http
POST /products
Headers:
  Authorization: Bearer <token>
  Content-Type: multipart/form-data

Body (form-data):
  title: "Nom du produit"
  description: "Description du produit"
  price: 99.99
  image: [fichier]
```

#### Mettre à jour un produit
```http
PATCH /products/:id
Headers:
  Authorization: Bearer <token>
  Content-Type: multipart/form-data

Body (form-data):
  title: "Nouveau titre"
  price: 149.99
  image: [fichier]
```

## 🧪 Tests

Exécuter les tests :
```bash
npm test
```

## 🔒 Authentification

Le service utilise JWT pour l'authentification. Pour les routes protégées, incluez le token dans le header :
```http
Authorization: Bearer <votre_token>
```

## 📁 Structure du Projet

```
services/products/
├── controllers/
│   └── productsController.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   └── productsModel.js
├── routes/
│   └── productsRoute.js
├── tests/
│   └── product.test.js
├── utils/
│   └── generateTestToken.js
├── uploads/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## 🐳 Docker (Optionnel)

Si vous utilisez Docker :

```bash
# Construire l'image
docker build -t products-service .

# Lancer le conteneur
docker run -p 3002:3002 products-service
```

## 🤝 Intégration avec la Gateway

Ce service est conçu pour fonctionner avec une API Gateway. Les requêtes doivent être routées via :
```
http://localhost:3000/api/products
```

## ⚠️ Notes importantes

1. Assurez-vous que MongoDB est en cours d'exécution
2. Les images sont stockées localement dans le dossier `uploads/`
3. Le cache Redis est optionnel mais recommandé pour les performances
4. Les tokens JWT expirent après 24 heures

## 🐛 Dépannage

1. **Erreur de connexion MongoDB**
   - Vérifiez que MongoDB est en cours d'exécution
   - Vérifiez l'URL de connexion dans `.env`

2. **Erreur d'authentification**
   - Générez un nouveau token avec `generateTestToken.js`
   - Vérifiez que le JWT_SECRET correspond

3. **Erreur d'upload d'image**
   - Vérifiez que le dossier `uploads/` existe
   - Vérifiez les permissions du dossier

## 📝 License

MIT

## 👥 Contributeurs

-Tom 
-Aymeric
-Guillem
-Fabien
