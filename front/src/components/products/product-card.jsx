import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const ProductImage = ({ image, title }) => (
	<Image
		src={image || "/placeholder.svg"}
		alt={title}
		width={300}
		height={200}
		className="object-cover w-full h-48 rounded-t-lg"
	/>
);

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

const ProductCard = ({ product }) => {
	return (
		<Card key={product.title} className="flex flex-col">
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
