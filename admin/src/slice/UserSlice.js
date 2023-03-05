import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
	name: "users",
	initialState: {
		currentUser: [],
		currentUserOrder: [],
		allUser: [],
		user: {},
		totalUser: 0,
		isFetching: false,
		error: false,
		msg: "",
	},
	reducers: {
		createUser: (state, action) => {
			state.currentUser = action.payload;
		},
		getUserStart: (state) => {
			state.isFetching = true;
			state.msg = "";
			state.error = false;
		},
		getUserSuccess: (state, action) => {
			state.user = action.payload;
			state.error = false;
			state.isFetching = false;
			state.msg = "";
		},
		getUserFailed: (state, action) => {
			state.msg = action.payload;
			state.error = true;
			state.isFetching = false;
		},
		getTotalUsersStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.msg = "";
		},
		getTotalUsersSuccess: (state, action) => {
			state.totalUser = action.payload;
			state.isFetching = false;
			state.error = false;
			state.msg = "";
		},
		getTotalUsersFailed: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.msg = action.payload;
		},
		getAllUsersStart: (state) => {
			state.isFetching = true;
			state.msg = "";
		},
		getAllUsersSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.allUser = action.payload;
			state.msg = "";
		},
		getAllUsersFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msg = action.payload;
		},
		updateUserStart: (state) => {
			state.isFetching = true;
			state.msg = "";
		},
		updateUserSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentUser = action.payload;
			state.msg = "";
		},
		updateUserFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msg = action.payload;
		},
		logOutUser: (state) => {
			state.currentUser = [];
		},
		deleteUserStart: (state) => {
			state.isFetching = true;
		},
		deleteUserSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
		},
		deleteUserFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
		},
		getOrderUserStart: (state) => {
			state.isFetching = true;
			state.msg = "";
		},
		getOrderUserSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentUserOrder = action.payload;
			state.msg = "";
		},
		getOrderUserFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msg = action.payload;
		},
	},
});

export const {
	getAllUsersStart,
	getAllUsersSuccess,
	getAllUsersFailed,
	deleteUserFailed,
	deleteUserSuccess,
	deleteUserStart,
	updateUserFailed,
	updateUserStart,
	updateUserSuccess,
	createUser,
	logOutUser,
	getTotalUsersFailed,
	getTotalUsersStart,
	getTotalUsersSuccess,
	getUserFailed,
	getUserStart,
	getUserSuccess,
	getOrderUserStart,
	getOrderUserFailed,
	getOrderUserSuccess,
} = UserSlice.actions;

export default UserSlice.reducer;
