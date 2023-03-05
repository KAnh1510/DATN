import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
	name: "orders",
	initialState: {
		currentOrder: [],
		allOrder: [],
		isFetching: false,
		totalOrder: 0,
		error: false,
		msg: "",
		monthlyIncome: [],
	},
	reducers: {
		getTotalOrderStart: (state) => {
			state.isFetching = true;
		},
		getTotalOrderSuccess: (state, action) => {
			state.totalOrder = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		getTotalOrderFailed: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.msg = action.payload;
		},
		getOrderStart: (state) => {
			state.isFetching = true;
			state.msg = "";
			state.error = false;
		},
		getOrderSuccess: (state, action) => {
			state.currentOrder = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		getOrderFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msg = action.payload;
		},
		getAllOrdersStart: (state) => {
			state.isFetching = true;
		},
		getAllOrdersSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.allOrder = action.payload;
		},
		getAllOrdersFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		updateOrderStart: (state) => {
			state.isFetching = true;
			state.msg = "";
		},
		updateOrderSuccess: (state) => {
			state.isFetching = false;
			state.error = false;
			state.msg = "Update Successfully!";
		},
		updateOrderFailed: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.msg = action.payload;
		},
	},
});

export const {
	createOrder,
	getAllOrdersFailed,
	getAllOrdersSuccess,
	getAllOrdersStart,
	updateOrderFailed,
	updateOrderSuccess,
	updateOrderStart,
	getTotalOrderFailed,
	getTotalOrderSuccess,
	getTotalOrderStart,
	getOrderFailed,
	getOrderStart,
	getOrderSuccess,
} = UserSlice.actions;

export default UserSlice.reducer;
