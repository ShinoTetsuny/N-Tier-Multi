const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const productsRoute = require('./routes/productsRoute');

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connecté à MongoDB avec succès');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1); // Arrêter l'application si la connexion échoue
    }
};

// Établir la connexion

if(process.env.NODE_ENV !== 'test'){
    connectDB();
}

// Routes
app.use('/products', productsRoute);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue!' });
});

// Ne démarrer le serveur que si nous ne sommes pas en mode test
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        console.log(`Service Products en cours d'exécution sur le port ${PORT}`);
    });
}

module.exports = app;
