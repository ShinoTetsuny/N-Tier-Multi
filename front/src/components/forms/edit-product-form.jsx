import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { productService } from "@/services/product-service";
import { Pencil } from "lucide-react";

const EditProductForm = ({ product }) => {
	const [open, setOpen] = useState(false);
	const form = useForm({
		defaultValues: {
			title: product.title,
			price: product.price,
			description: product.description,
		},
	});

	const onSubmit = async (data) => {
		try {
			const formattedData = {
				...data,
				price: parseFloat(data.price),
			};

			console.log("formattedData", formattedData);

			await productService.updateProduct(product._id, formattedData);
			setOpen(false);
			form.reset();
		} catch (error) {
			console.error("Erreur lors de la création du produit:", error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-12 top-2 h-8 w-8"
				>
					<Pencil className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Créer un nouveau produit</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							rules={{ required: "Le titre est requis" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Titre</FormLabel>
									<FormControl>
										<Input placeholder="Nom du produit" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="price"
							rules={{
								required: "Le prix est requis",
								pattern: {
									value: /^\d*\.?\d*$/,
									message: "Veuillez entrer un prix valide",
								},
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Prix</FormLabel>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											placeholder="39.99"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							rules={{ required: "La description est requise" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Description du produit"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								Annuler
							</Button>
							<Button type="submit">Modifier</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProductForm;
