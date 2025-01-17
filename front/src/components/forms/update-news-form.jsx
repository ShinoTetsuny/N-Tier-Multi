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
import { Pencil } from "lucide-react";
import { useNews } from "@/store/news-ctx";

const UpdateNewsForm = ({ news }) => {
	const [open, setOpen] = useState(false);
	const { updateNews } = useNews();
	const form = useForm({
		defaultValues: {
			title: news.title,
			content: news.content,
		},
	});

	const onSubmit = async (data) => {
		try {
			await updateNews(news._id, data);
			setOpen(false);
			form.reset();
		} catch (error) {
			console.error("Erreur lors de la création de la news:", error);
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
					<DialogTitle>Modifier votre news</DialogTitle>
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
										<Input placeholder="Titre de la news" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="content"
							rules={{ required: "Le contenu est requis" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contenu</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Contenu de la news"
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

export default UpdateNewsForm;
