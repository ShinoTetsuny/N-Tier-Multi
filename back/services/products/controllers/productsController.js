const Product = require('../models/productsModel');
// const Redis = require('ioredis');
// const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// const CACHE_EXPIRATION = 60; // 1 Minutes en secondes

exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            ownerId: req.user.userId
        });
        await product.save();
        // await redis.del('products');
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        // Vérifier le cache d'abord
        // const cachedProducts = await redis.get('products');
        // if (cachedProducts) {
        //     return res.json(JSON.parse(cachedProducts));
        // }

        const products = await Product.find();
        // Mettre en cache pour les futures requêtes
        // await redis.setex('products', CACHE_EXPIRATION, JSON.stringify(products));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        // const cacheKey = `product:${req.params.id}`;
        // Vérifier le cache
        // const cachedProduct = await redis.get(cacheKey);
        // if (cachedProduct) {
        //     return res.json(JSON.parse(cachedProduct));
        // }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        // Mettre en cache
        // await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(product));
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Vérification du propriétaire
        if (product.ownerId.toString() !== req.user.userId) {
            return res.status(403).json({ 
                message: 'Vous n\'êtes pas autorisé à modifier ce produit' 
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // await redis.del(`product:${req.params.id}`);
        // await redis.del('products');
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Vérification du propriétaire
        if (product.ownerId.toString() !== req.user.userId) {
            return res.status(403).json({ 
                message: 'Vous n\'êtes pas autorisé à supprimer ce produit' 
            });
        }

        await Product.findByIdAndDelete(req.params.id);
        // await redis.del(`product:${req.params.id}`);
        // await redis.del('products');
        res.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
