"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { newsService } from "@/services/news-service";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchNews = async () => {
		setLoading(true);
		try {
			const data = await newsService.getAllNews();
			setNews(data);
		} catch (err) {
			setError("Impossible de charger les news");
		} finally {
			setLoading(false);
		}
	};

	const addNews = async (newsData) => {
		try {
			await newsService.createNews(newsData);
			fetchNews();
		} catch (err) {
			setError("Impossible d'ajouter la news");
		}
	};

	const updateNews = async (id, newsData) => {
		try {
			await newsService.updateNews(id, newsData);
			fetchNews();
		} catch (err) {
			setError("Impossible de mettre à jour la news");
		}
	};

	const deleteNews = async (id) => {
		try {
			await newsService.deleteNews(id);
			fetchNews();
		} catch (err) {
			setError("Impossible de supprimer la news");
		}
	};

	useEffect(() => {
		fetchNews();
	}, []);

	return (
		<NewsContext.Provider
			value={{
				news,
				loading,
				error,
				fetchNews,
				addNews,
				updateNews,
				deleteNews,
			}}
		>
			{children}
		</NewsContext.Provider>
	);
};

export const useNews = () => {
	return useContext(NewsContext);
};
