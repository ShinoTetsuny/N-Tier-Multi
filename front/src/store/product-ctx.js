"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { productService } from "@/services/product-service";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const data = await productService.getAllProducts();
			setProducts(data);
		} catch (err) {
			setError("Impossible de charger les produits");
		} finally {
			setLoading(false);
		}
	};

	const addProduct = async (productData) => {
		try {
			await productService.createProduct(productData);
			fetchProducts();
		} catch (err) {
			setError("Impossible d'ajouter le produit");
		}
	};

	const updateProduct = async (id, productData) => {
		try {
			await productService.updateProduct(id, productData);
			fetchProducts();
		} catch (err) {
			setError("Impossible de mettre à jour le produit");
		}
	};

	const deleteProduct = async (id) => {
		try {
			await productService.deleteProduct(id);
			fetchProducts();
		} catch (err) {
			setError("Impossible de supprimer le produit");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<ProductContext.Provider
			value={{
				products,
				loading,
				error,
				fetchProducts,
				addProduct,
				updateProduct,
				deleteProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProducts = () => {
	return useContext(ProductContext);
};
