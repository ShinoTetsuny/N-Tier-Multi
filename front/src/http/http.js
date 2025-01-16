import axios from "axios";

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MTdjMDkyNjU2ZmMxZjFmNzc0NmQiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNzAzNzc2MCwiZXhwIjoxNzM3MTI0MTYwfQ.3hYhQB_uAz0Sh42lVZS8nB_zvB1vGzxDnS2-YDwwpJ0";

const http = axios.create({
	baseURL: process.env.NEXT_APP_API_URL || "http://localhost:3002",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${TOKEN}`,
	},
});

/*
http.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
*/

http.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default http;
