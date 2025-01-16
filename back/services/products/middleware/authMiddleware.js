const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contient { userId, email, ... }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware; 