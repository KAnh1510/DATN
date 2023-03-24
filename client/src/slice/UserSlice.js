import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
	name: "users",
	initialState: {
		currentUser: [],
		isFetching: false,
		error: false,
		msg: "",
	},
	reducers: {
		createUserStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		createUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.error = false;
			state.msg = "";
		},
		createUserFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msg = action.payload;
		},
		getUsersStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getUsersSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentUser = action.payload;
		},
		getUsersFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		updateUserStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateUserSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentUser = action.payload;
		},
		updateUserFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
		},
		logOutUser: (state) => {
			state.currentUser = [];
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
	getUsersStart,
	getUsersSuccess,
	getUsersFailed,
	updateUserFailed,
	updateUserStart,
	updateUserSuccess,
	createUserSuccess,
	createUserFailed,
	createUserStart,
	logOutUser,
	resetState,
} = UserSlice.actions;

export default UserSlice.reducer;
