import { constants } from "../constants";
import { guest, user } from "../createInstance";
import {
	loginFailed,
	loginStart,
	loginSuccess,
	logOutFailed,
	logOutStart,
	logOutSuccess,
	registerFailed,
	registerStart,
	registerSuccess,
} from "../slice/AuthSlice";
import { createUser, logOutUser } from "../slice/UserSlice";

export const loginUser = async (user, dispatch, navigate) => {
	dispatch(loginStart());
	try {
		const res = await guest.post("/auth/login", user);
		localStorage.setItem(constants.userToken, res.data.accessToken);
		dispatch(loginSuccess());
		navigate("/home");
		dispatch(createUser(res.data));
	} catch (error) {
		console.log(error);
		dispatch(loginFailed(error.response.data));
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
		localStorage.removeItem(constants.userToken);
		dispatch(logOutSuccess());
		dispatch(logOutUser());
		navigate("/");
	} catch (err) {
		console.log(err);
		dispatch(logOutFailed());
	}
};
