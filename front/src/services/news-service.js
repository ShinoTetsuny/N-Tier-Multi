import { newsAPI } from "@/http/api/news";

class NewsService {
	async getAllNews() {
		try {
			const response = await newsAPI.getAll();
			return response.data;
		} catch (error) {
			throw new Error("Impossible de récupérer les news");
		}
	}

	async getNewsById(id) {
		try {
			const response = await newsAPI.getById(id);
			return response.data;
		} catch (error) {
			throw new Error("News non trouvé");
		}
	}

	async createNews(newsData) {
		try {
			const response = await newsAPI.create(newsData);
			return response.data;
		} catch (error) {
			throw new Error("Impossible de créer la news");
		}
	}

	async updateNews(id, newsData) {
		try {
			const response = await newsAPI.update(id, newsData);
			return response.data;
		} catch (error) {
			throw new Error("Impossible de mettre à jour la news");
		}
	}

	async deleteNews(id) {
		try {
			await newsAPI.delete(id);
			return true;
		} catch (error) {
			throw new Error("Impossible de supprimer la news");
		}
	}
}

export const newsService = new NewsService();
