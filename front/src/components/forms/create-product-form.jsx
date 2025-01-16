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

const CreateProductForm = () => {
	const [open, setOpen] = useState(false);
	const form = useForm({
		defaultValues: {
			title: "",
			price: "",
			description: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			// Convertir le prix en nombre
			const formattedData = {
				...data,
				price: parseFloat(data.price),
			};

			await productService.createProduct(formattedData);
			setOpen(false);
			form.reset();
			// Vous pouvez ajouter un toast ici pour confirmer la création
		} catch (error) {
			console.error("Erreur lors de la création du produit:", error);
			// Vous pouvez ajouter un toast d'erreur ici
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default">Ajouter un produit</Button>
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
							<Button type="submit">Créer</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProductForm;
