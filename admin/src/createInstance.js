import axios from "axios";
import queryString from "query-string";

const BASE_URL = "http://localhost:5000/api";

export const guest = axios.create({
	baseURL: BASE_URL,
	paramsSerializer: (params) =>
		queryString.stringify(params, { arrayFormat: "repeat" }),
});
export const user = axios.create({ baseURL: BASE_URL, timeout: 30000 });

guest.defaults.withCredentials = true;
user.interceptors.request.use(
	function (config) {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			config.headers["x-access-token"] = accessToken;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

user.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (
			!originalRequest.retry &&
			error.response &&
			error.response.status === 401
		) {
			try {
				originalRequest.retry = true;
				let res = await refreshToken();
				localStorage.setItem("accessToken", res.data.accessToken);
				console.log("Access token refreshed");
				return user(originalRequest);
			} catch (err) {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

const refreshToken = async () => {
	return await guest.post("/auth/refresh-token");
};
