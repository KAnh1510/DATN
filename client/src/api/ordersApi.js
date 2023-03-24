import { guest } from "~/createInstance";
import {
	createOrderSuccess,
	getOrderFailed,
	getOrderStart,
	getOrderSuccess,
	updateOrderFailed,
	updateOrderStart,
	updateOrderSuccess,
} from "~/slice/OrderSlice";

export const createOrders = async (dispatch, newOrder) => {
	try {
		const res = await guest.post("/orders/create", newOrder);
		dispatch(createOrderSuccess(res.data));
	} catch (error) {
		console.log(error);
	}
};

export const getOrder = async (dispatch, userId, status) => {
	dispatch(getOrderStart());
	try {
		const res = await guest.post(`/orders/find-status/${userId}`, status);
		dispatch(getOrderSuccess(res.data));
	} catch (error) {
		console.log(error);
		dispatch(getOrderFailed());
	}
};

export const updateOrder = async (dispatch, id, currentOrder) => {
	dispatch(updateOrderStart());
	try {
		const res = await guest.put(`/orders/update/${id}`, currentOrder);
		dispatch(updateOrderSuccess(res.data));
	} catch (error) {
		dispatch(updateOrderFailed());
	}
};
