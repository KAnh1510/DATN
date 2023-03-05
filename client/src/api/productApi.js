// api/productApi.js
import { guest } from "~/createInstance";
import {
	getProductFailed,
	getProductsByCatFailed,
	getProductsByCatStart,
	getProductsByCatSuccess,
	getProductsFailed,
	getProductsStart,
	getProductsSuccess,
	getProductStart,
	getProductSuccess,
	searchProductFailed,
	searchProductStart,
	searchProductSuccess,
} from "~/slice/ProductSlice";

export const getAllProducts = async (dispatch) => {
	dispatch(getProductsStart());
	try {
		const res = await guest.get("/products/");
		dispatch(getProductsSuccess(res.data));
	} catch (error) {
		dispatch(getProductsFailed());
	}
};

export const getProductsByCategory = async (dispatch, type) => {
	dispatch(getProductsByCatStart());
	try {
		const res = await guest.get(`/products/find/${type}`);
		dispatch(getProductsByCatSuccess(res.data));
	} catch (error) {
		dispatch(getProductsByCatFailed());
	}
};

export const getProduct = async (dispatch, id) => {
	dispatch(getProductStart());
	try {
		const res = await guest.post(`/products/find/${id}`);
		dispatch(getProductSuccess(res.data));
	} catch (error) {
		dispatch(getProductFailed(error.response.data));
	}
};

export const searchProduct = async (dispatch, id) => {
	dispatch(searchProductStart());
	try {
		const res = await guest.get("/products/");
		dispatch(searchProductSuccess(res.data));
	} catch (error) {
		dispatch(searchProductFailed(error.response.data));
	}
};
