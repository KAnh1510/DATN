import { createSlice } from "@reduxjs/toolkit";

export const OrderSlice = createSlice({
	name: "orders",
	initialState: {
		currentOrder: {},
		orders: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		createOrderSuccess: (state, action) => {
			state.currentOrder = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		getOrderStart: (state) => {
			state.isFetching = true;
		},
		getOrderSuccess: (state, action) => {
			state.orders = action.payload;
			state.isFetching = false;
		},
		getOrderFailed: (state) => {
			state.isFetching = false;
		},
		updateOrderStart: (state) => {
			state.isFetching = true;
		},
		updateOrderSuccess: (state, action) => {
			state.currentOrder = action.payload;
			state.isFetching = false;
		},
		updateOrderFailed: (state) => {
			state.isFetching = false;
		},
	},
});

export const {
	createOrderSuccess,
	getOrderStart,
	getOrderSuccess,
	getOrderFailed,
	updateOrderStart,
	updateOrderSuccess,
	updateOrderFailed,
} = OrderSlice.actions;
export default OrderSlice.reducer;
