import { guest, user } from "../createInstance";
import {
	getAllOrdersFailed,
	getAllOrdersStart,
	getAllOrdersSuccess,
	getOrderFailed,
	getOrderStart,
	getOrderSuccess,
	getTotalOrderFailed,
	getTotalOrderStart,
	getTotalOrderSuccess,
	updateOrderFailed,
	updateOrderStart,
	updateOrderSuccess,
} from "../slice/OrderSlice";

export const getAllOrder = async (dispatch, filterOption) => {
	dispatch(getAllOrdersStart());
	try {
		let res;
		if (filterOption === "all") {
			res = await user.get("/orders");
		} else {
			res = await user.get(`/orders/${filterOption}`);
		}
		dispatch(getAllOrdersSuccess(res.data));
	} catch (error) {
		dispatch(getAllOrdersFailed(error.response.data));
	}
};

export const getTotalOrders = async (dispatch) => {
	dispatch(getTotalOrderStart());
	try {
		const res = await user.get("/orders/total-orders");
		dispatch(getTotalOrderSuccess(res.data?.totalOrder));
	} catch (error) {
		console.log(error);
		dispatch(getTotalOrderFailed(error.response.data));
	}
};

export const changeStatusOrder = async (dispatch, id, currentOrder) => {
	dispatch(updateOrderStart());
	try {
		const res = await guest.put(`/orders/update/${id}`, currentOrder);
		dispatch(updateOrderSuccess(res.data));
	} catch (error) {
		dispatch(updateOrderFailed(error.response.data));
	}
};

export const getSingleOrder = async (dispatch, orderId) => {
	dispatch(getOrderStart());
	try {
		const res = await user.get(`/orders/get-by-id/${orderId}`);
		dispatch(getOrderSuccess(res.data));
	} catch (error) {
		dispatch(getOrderFailed(error.response.data));
	}
};
