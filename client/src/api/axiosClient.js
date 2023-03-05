// api/axiosClient.js
import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = user && JSON.parse(user).login.currentUser;
const TOKEN = currentUser?.accessToken;
const BASE_URL = "http://localhost:5000/api";

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header: {
		token: `Bearer ${TOKEN}`,
	},
});
