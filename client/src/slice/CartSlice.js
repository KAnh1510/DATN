import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
	name: "cart",
	initialState: {
		carts: [],
		isFetching: false,
		error: false,
		products: [],
		totalQtn: 0,
	},
	reducers: {
		getCartStart: (state) => {
			state.isFetching = true;
		},
		getCartSuccess: (state, action) => {
			state.products = action.payload.products;
			state.carts = action.payload;
		},
		getCartFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		updateCartStart: (state) => {
			state.isFetching = true;
		},
		updateCartSuccess: (state, action) => {
			state.carts = action.payload;
		},
		updateCartFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		deleteProductInCartStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		deleteProductInCartSuccess: (state, action) => {
			state.error = false;
			state.isFetching = false;
			state.products = action.payload.products;
			state.carts = action.payload;
		},
		deleteProductInCartFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		deleteCartStart: (state) => {
			state.isFetching = true;
		},
		deleteCartSuccess: (state) => {
			state.error = false;
			state.isFetching = false;
			state.carts.products = [];
			state.products = [];
		},
		deleteCartFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		increaseQtn: (state) => {
			let temp = 0;
			state.products?.forEach((item) => (temp += item.quantity));
			state.totalQtn = temp;
		},
	},
});

export const {
	getCartStart,
	getCartSuccess,
	getCartFailed,
	updateCartFailed,
	updateCartStart,
	updateCartSuccess,
	deleteProductInCartFailed,
	deleteProductInCartStart,
	deleteProductInCartSuccess,
	deleteCartFailed,
	deleteCartStart,
	deleteCartSuccess,
	increaseQtn,
	getCartsSuccess,
} = CartSlice.actions;
export default CartSlice.reducer;
