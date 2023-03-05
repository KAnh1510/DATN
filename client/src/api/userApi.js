import { user } from "~/createInstance";
import {
	getUsersFailed,
	getUsersStart,
	getUsersSuccess,
	updateUserFailed,
	updateUserStart,
	updateUserSuccess,
} from "~/slice/UserSlice";

export const getAllUsers = async (dispatch) => {
	dispatch(getUsersStart());
	try {
		const response = await user.get("/users/");
		dispatch(getUsersSuccess(response.data));
	} catch (error) {
		dispatch(getUsersFailed());
	}
};

export const updateUser = async (
	dispatch,
	username,
	address,
	phoneNumber,
	id
) => {
	dispatch(updateUserStart());
	try {
		const response = await user.put(`/users/edit-profile/${id}`, {
			username,
			address,
			phoneNumber,
		});
		dispatch(updateUserSuccess(response.data));
	} catch (error) {
		console.log(error);
		dispatch(updateUserFailed(error.response.data));
	}
};
