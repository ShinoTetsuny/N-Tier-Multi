import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Pencil } from "lucide-react";
import { productService } from "@/services/product-service";
import EditProductForm from "../forms/edit-product-form";
import { useProducts } from "@/store/product-ctx";

const ProductInfo = ({ title, price }) => (
	<>
		<CardTitle>{title}</CardTitle>
		<CardDescription>{price}</CardDescription>
	</>
);

const ProductDescription = ({ description }) => <p>{description}</p>;

const BuyButton = () => (
	<Button className="w-full">
		<ShoppingBag className="mr-2 h-4 w-4" /> Acheter
	</Button>
);

const DeleteButton = ({ productId }) => {
	const { deleteProduct } = useProducts();
	const handleDelete = async () => {
		try {
			await deleteProduct(productId);
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className="absolute right-2 top-2 h-8 w-8"
			onClick={handleDelete}
		>
			<X className="h-4 w-4" />
		</Button>
	);
};

{
	/* <Button
variant="ghost"
size="icon"
className="absolute right-12 top-2 h-8 w-8"
onClick={handleEdit}
>
<Pencil className="h-4 w-4" />
</Button> */
}

const ProductCard = ({ product }) => {
	return (
		<Card key={product.title} className="flex flex-col relative">
			<DeleteButton productId={product._id} />
			<EditProductForm product={product} />
			<CardHeader>
				<ProductInfo title={product.title} price={product.price} />
			</CardHeader>
			<CardContent className="flex-grow">
				<ProductDescription description={product.description} />
			</CardContent>
			<CardFooter>
				<BuyButton />
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
