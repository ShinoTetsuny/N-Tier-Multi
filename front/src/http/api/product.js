import http from "../http";

export const productAPI = {
	getAll: () => http.get("/"),
	getById: (id) => http.get(`/products/${id}`),
	create: (data) => http.post("/products", data),
	update: (id, data) => http.put(`/products/${id}`, data),
	delete: (id) => http.delete(`/products/${id}`),
	search: (query) => http.get(`/products/search?q=${query}`),
	getByCategory: (categoryId) => http.get(`/products/category/${categoryId}`),
};
