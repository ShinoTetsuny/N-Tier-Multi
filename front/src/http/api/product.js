import http from "../http";

export const productAPI = {
	getAll: () => http.get("/api/products/"),
	getById: (id) => http.get(`/api/products/${id}`),
	create: (data) => http.post("/api/products", data),
	update: (id, data) => http.patch(`/api/products/${id}`, data),
	delete: (id) => http.delete(`/api/products/${id}`),
	search: (query) => http.get(`/api/products/search?q=${query}`),
	getByCategory: (categoryId) =>
		http.get(`/api/products/category/${categoryId}`),
};
