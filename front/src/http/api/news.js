import http from "../http";

export const newsAPI = {
	getAll: () => http.get("/api/news/"),
	getById: (id) => http.get(`/api/news/${id}`),
	create: (data) => http.post("/api/news", data),
	update: (id, data) => http.patch(`/api/news/${id}`, data),
	delete: (id) => http.delete(`/api/news/${id}`),
};
