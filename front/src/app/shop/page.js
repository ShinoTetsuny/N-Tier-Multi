"use client";

import { useState, useEffect } from "react";
import { productService } from "@/services/product-service";

const Shop = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		productService.getAllProducts().then((data) => setProducts(data));
	}, []);

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
					Nos Produits Cool
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<ProductCard key={product.name} product={product} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Shop;
