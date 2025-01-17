const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes publiques
router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);

// Routes protégées
router.post("/", authMiddleware, productsController.createProduct);
router.patch("/:id", authMiddleware, productsController.updateProduct);
router.delete("/:id", authMiddleware, productsController.deleteProduct);

module.exports = router;
