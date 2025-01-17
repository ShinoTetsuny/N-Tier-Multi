import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import UpdateNewsForm from "../forms/update-news-form";
import { newsService } from "@/services/news-service";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const DeleteButton = ({ newsId }) => {
	const handleDelete = async () => {
		try {
			await newsService.deleteNews(newsId);
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

const NewsCard = ({ news }) => (
	<Card className="flex flex-col relative">
		<DeleteButton newsId={news._id} />
		<UpdateNewsForm news={news} />
		<CardHeader>
			<CardTitle>{news.title}</CardTitle>
			<CardDescription>{news.description}</CardDescription>
		</CardHeader>
		<CardContent>
			<p>{news.content}</p>
		</CardContent>
	</Card>
);

export default NewsCard;
