import { productAPI } from "@/http/api/product";

class ProductService {
	async getAllProducts() {
		try {
			const response = await productAPI.getAll();
			return response.data;
		} catch (error) {
			throw new Error("Impossible de récupérer les produits");
		}
	}

	async getProductById(id) {
		try {
			const response = await productAPI.getById(id);
			return response.data;
		} catch (error) {
			throw new Error("Produit non trouvé");
		}
	}

	async createProduct(productData) {
		try {
			const response = await productAPI.create(productData);
			return response.data;
		} catch (error) {
			throw new Error("Impossible de créer le produit");
		}
	}

	async updateProduct(id, productData) {
		try {
			console.log("id", id);
			console.log("productData", productData);
			const response = await productAPI.update(id, productData);
			return response.data;
		} catch (error) {
			throw new Error("Impossible de mettre à jour le produit");
		}
	}

	async deleteProduct(id) {
		try {
			await productAPI.delete(id);
			return true;
		} catch (error) {
			throw new Error("Impossible de supprimer le produit");
		}
	}
}

export const productService = new ProductService();
