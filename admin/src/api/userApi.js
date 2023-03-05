import { guest, user } from "../createInstance";
import {
	deleteUserFailed,
	deleteUserStart,
	deleteUserSuccess,
	getAllUsersFailed,
	getAllUsersStart,
	getAllUsersSuccess,
	getOrderUserFailed,
	getOrderUserStart,
	getOrderUserSuccess,
	getTotalUsersFailed,
	getTotalUsersStart,
	getTotalUsersSuccess,
	getUserFailed,
	getUserStart,
	getUserSuccess,
	updateUserFailed,
	updateUserStart,
	updateUserSuccess,
} from "../slice/UserSlice";

export const getAllUser = async (dispatch, filterOption) => {
	dispatch(getAllUsersStart());
	try {
		let res;
		if (filterOption === "0") {
			res = await user.get("/users/list");
		} else if (filterOption === "1") {
			res = await user.get("/users/get-admin");
		} else if (filterOption === "2") {
			res = await user.get("/users/get-customer");
		}
		dispatch(getAllUsersSuccess(res.data));
	} catch (error) {
		dispatch(getAllUsersFailed(error.response.data));
	}
};

export const getTotalUsers = async (dispatch) => {
	dispatch(getTotalUsersStart());
	try {
		const res = await user.get("/users/total-users");
		dispatch(getTotalUsersSuccess(res.data?.totalUser));
	} catch (error) {
		dispatch(getTotalUsersFailed(error.response.data));
	}
};

export const getUser = async (dispatch, id) => {
	dispatch(getUserStart());
	try {
		const res = await user.get(`/users/find/${id}`);
		dispatch(getUserSuccess(res.data));
	} catch (err) {
		dispatch(getUserFailed(err.response.data));
	}
};

export const deleteUser = async (dispatch, id, navigate) => {
	dispatch(deleteUserStart());
	try {
		const res = await user.delete(`/users/remove/${id}`);
		navigate(`${id}`);
		dispatch(deleteUserSuccess(res.data));
	} catch (err) {
		dispatch(deleteUserFailed(err.response.data));
	}
};

export const getOrderUser = async (dispatch, userId) => {
	dispatch(getOrderUserStart());
	try {
		const res = await guest.get(`/orders/find/${userId}`);
		dispatch(getOrderUserSuccess(res.data));
	} catch (err) {
		dispatch(getOrderUserFailed(err.response.data));
	}
};

export const updateUser = async (dispatch, userId, newUser) => {
	dispatch(updateUserStart());
	try {
		const res = await user.put(`/users/edit-profile/${userId}`, newUser);
		dispatch(updateUserSuccess(res.data));
	} catch (err) {
		dispatch(updateUserFailed(err.response.data));
	}
};
