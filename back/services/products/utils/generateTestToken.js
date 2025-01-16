const jwt = require('jsonwebtoken');

// Clé secrète (doit être la même que dans votre .env)
const JWT_SECRET = 'votre_secret_jwt_tres_long_et_complexe';

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId().toString();

// Données de test pour le token
const testUser = {
    userId: id,
    email: 'test@example.com',
    role: 'user'
};

// Création du token
const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: '24h' });

console.log('Votre token de test :');
console.log(token); 