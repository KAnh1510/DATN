import { guest } from "~/createInstance";
import {
	deleteCartFailed,
	deleteCartStart,
	deleteCartSuccess,
	deleteProductInCartFailed,
	deleteProductInCartStart,
	deleteProductInCartSuccess,
	getCartFailed,
	getCartsSuccess,
	getCartStart,
	getCartSuccess,
	updateCartFailed,
	updateCartStart,
	updateCartSuccess,
} from "~/slice/CartSlice";

export const getCart = async (dispatch, userId) => {
	dispatch(getCartStart());
	try {
		const res = await guest.get(`/carts/find/${userId}`);
		dispatch(getCartSuccess(res.data));
	} catch (error) {
		dispatch(getCartFailed());
	}
};

export const getCarts = async (dispatch, userId) => {
	dispatch(getCartStart());
	try {
		const res = await guest.get(`/carts/find/${userId}`);
		dispatch(getCartsSuccess(res.data));
	} catch (error) {
		dispatch(getCartFailed());
	}
};

export const updateCart = async (dispatch, id, data) => {
	dispatch(updateCartStart());
	try {
		const res = await guest.put(`/carts/${id}`, data);
		dispatch(updateCartSuccess(res.data));
	} catch (error) {
		dispatch(updateCartFailed());
	}
};

export const createCart = async (dispatch, data) => {
	try {
		const res = await guest.post("/carts/create", data);
		dispatch(updateCartSuccess(res.data));
	} catch (error) {}
};

export const deleteItemInCart = async (dispatch, id, userId) => {
	dispatch(deleteProductInCartStart());
	try {
		const response = await guest.post(`/carts/product/remove/${id}`, {
			userId,
		});
		dispatch(deleteProductInCartSuccess(response.data));
	} catch (error) {
		dispatch(deleteProductInCartFailed());
	}
};

export const deleteCart = async (dispatch, id) => {
	dispatch(deleteCartStart());
	try {
		await guest.delete(`/carts/delete/${id}`);
		dispatch(deleteCartSuccess());
	} catch (error) {
		dispatch(deleteCartFailed());
	}
};
