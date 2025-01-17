import axios from "axios";

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhhMWE2M2YwNWY0NDQ4ZDlkNjUwZWMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNzEwMzk3MSwiZXhwIjoxNzM3MTkwMzcxfQ.r1i8M1YnuJH8EV0pLKqqhyhlga_KnmtPAUGA8hqR5OY";

const http = axios.create({
	baseURL: process.env.NEXT_APP_API_URL || "http://localhost:3000",
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
