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
		getOrderStart: (state) => {},
		getOrderSuccess: (state, action) => {
			state.orders = action.payload;
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
	updateOrderStart,
	updateOrderSuccess,
	updateOrderFailed,
} = OrderSlice.actions;
export default OrderSlice.reducer;
