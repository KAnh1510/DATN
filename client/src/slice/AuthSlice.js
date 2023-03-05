import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
	name: "auth",
	initialState: {
		isFetching: false,
		error: false,
		success: false,
	},
	reducers: {
		registerStart: (state) => {
			state.isFetching = true;
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.success = action.payload;
		},
		registerFailed: (state, action) => {
			state.isFetching = false;
			state.error = action.payload;
			state.success = false;
		},
		logOutSuccess: (state) => {
			state.isFetching = false;
			state.error = false;
		},
		logOutFailed: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		logOutStart: (state) => {
			state.isFetching = true;
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
} = AuthSlice.actions;

export default AuthSlice.reducer;
