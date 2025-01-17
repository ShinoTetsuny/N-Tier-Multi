"use client";

import ProductCard from "@/components/products/product-card";
import CreateProductForm from "@/components/forms/create-product-form";
import { useProducts } from "@/store/product-ctx";
const Shop = () => {
	const { products } = useProducts();

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Nos Produits Cool
					</h2>
					<CreateProductForm />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Shop;
