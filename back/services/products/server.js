const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const productsRoute = require('./routes/productsRoute');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoute);

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
