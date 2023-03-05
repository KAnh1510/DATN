import { guest, user } from "~/createInstance";
import {
	logOutFailed,
	logOutStart,
	logOutSuccess,
	registerFailed,
	registerStart,
	registerSuccess,
} from "~/slice/AuthSlice";
import {
	createUserFailed,
	createUserStart,
	createUserSuccess,
	logOutUser,
} from "~/slice/UserSlice";

export const loginUser = async (user, dispatch, navigate) => {
	dispatch(createUserStart());
	try {
		const res = await guest.post("/auth/login", user);
		localStorage.setItem("accessToken", res.data.accessToken);
		if (res.status === 200) {
			dispatch(createUserSuccess(res.data));
			navigate("/collection/all");
		}
	} catch (error) {
		dispatch(createUserFailed(error.response.data));
	}
};

export const registerUser = async (user, dispatch) => {
	dispatch(registerStart());
	try {
		const res = await guest.post("/auth/register", user);
		dispatch(registerSuccess(res.data));
	} catch (error) {
		dispatch(registerFailed(error.response.data));
	}
};

export const logOut = async (dispatch, navigate) => {
	dispatch(logOutStart());
	try {
		await user.post("/auth/logout");
		dispatch(logOutSuccess());
		dispatch(logOutUser());
		navigate("/login");
	} catch (err) {
		dispatch(logOutFailed());
	}
};
