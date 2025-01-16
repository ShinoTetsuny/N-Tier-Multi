const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const Product = require('../models/productsModel');
const app = require('../server');

let mongoServer;
const userId = new mongoose.Types.ObjectId().toString();

const generateTestToken = () => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'votre_secret_jwt_tres_long_et_complexe');
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Product.deleteMany({});
});

describe('Product API Tests', () => {
    describe('GET /api/products', () => {
        it('should return empty array when no products exist', async () => {
            const response = await request(app).get('/api/products');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should return all products', async () => {
            const testProduct = await Product.create({
                title: 'Test Product',
                description: 'Test Description',
                price: 99.99,
                ownerId: userId
            });

            const response = await request(app).get('/api/products');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].title).toBe(testProduct.title);
        });
    });

    describe('POST /api/products', () => {
        it('should create a new product with valid token', async () => {
            const token = generateTestToken();
            const productData = {
                title: 'New Product',
                description: 'New Description',
                price: 29.99
            };

            const response = await request(app)
                .post('/api/products')
                .set('Authorization', `Bearer ${token}`)
                .send(productData);

            expect(response.status).toBe(201);
            expect(response.body.title).toBe(productData.title);
            expect(response.body.ownerId).toBe(userId);
        });

        it('should reject creation without token', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({
                    title: 'New Product',
                    description: 'New Description',
                    price: 29.99
                });

            expect(response.status).toBe(401);
        });
    });

    describe('PUT /api/products/:id', () => {
        it('should update product if owner', async () => {
            const token = generateTestToken();
            const product = await Product.create({
                title: 'Original Title',
                description: 'Original Description',
                price: 99.99,
                ownerId: userId
            });

            const response = await request(app)
                .put(`/api/products/${product._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Title',
                    price: 149.99
                });

            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Updated Title');
            expect(response.body.price).toBe(149.99);
        });

        it('should reject update if not owner', async () => {
            const wrongUserId = new mongoose.Types.ObjectId().toString();
            const wrongToken = jwt.sign(
                { userId: wrongUserId },
                process.env.JWT_SECRET || 'votre_secret_jwt_tres_long_et_complexe'
            );

            const product = await Product.create({
                title: 'Original Title',
                description: 'Original Description',
                price: 99.99,
                ownerId: userId
            });

            const response = await request(app)
                .put(`/api/products/${product._id}`)
                .set('Authorization', `Bearer ${wrongToken}`)
                .send({
                    title: 'Updated Title'
                });

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /api/products/:id', () => {
        it('should delete product if owner', async () => {
            const token = generateTestToken();
            const product = await Product.create({
                title: 'To Delete',
                description: 'Will be deleted',
                price: 99.99,
                ownerId: userId
            });

            const response = await request(app)
                .delete(`/api/products/${product._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            const deletedProduct = await Product.findById(product._id);
            expect(deletedProduct).toBeNull();
        });

        it('should reject deletion if not owner', async () => {
            const wrongUserId = new mongoose.Types.ObjectId().toString();
            const wrongToken = jwt.sign(
                { userId: wrongUserId },
                process.env.JWT_SECRET || 'votre_secret_jwt_tres_long_et_complexe'
            );

            const product = await Product.create({
                title: 'To Delete',
                description: 'Will be deleted',
                price: 99.99,
                ownerId: userId
            });

            const response = await request(app)
                .delete(`/api/products/${product._id}`)
                .set('Authorization', `Bearer ${wrongToken}`);

            expect(response.status).toBe(403);
            const productStillExists = await Product.findById(product._id);
            expect(productStillExists).toBeTruthy();
        });
    });
}); 