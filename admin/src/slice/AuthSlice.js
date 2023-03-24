import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
	name: "auth",
	initialState: {
		isFetching: false,
		msg: "",
		error: false,
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.msg = "";
		},
		loginSuccess: (state) => {
			state.isFetching = false;
			state.error = false;
			state.msg = "";
		},
		loginFailed: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.msg = action.payload;
		},
		registerStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.msg = "";
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.msg = "";
		},
		registerFailed: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.msg = action.payload;
		},
		logOutSuccess: (state) => {
			state.isFetching = false;
			state.error = false;
			state.msg = "";
		},
		logOutFailed: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.msg = action.payload;
		},
		logOutStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.msg = "";
		},

		resetState: (state) => {
			state.error = false;
			state.isFetching = false;
			state.msg = "";
		},
	},
});

export const {
	registerFailed,
	registerSuccess,
	registerStart,
	logOutFailed,
	logOutSuccess,
	logOutStart,
	loginFailed,
	loginStart,
	loginSuccess,
	resetState,
} = AuthSlice.actions;

export default AuthSlice.reducer;
