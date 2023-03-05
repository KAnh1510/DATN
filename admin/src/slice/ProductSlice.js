import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
	name: "products",
	initialState: {
		currentProduct: [],
		allProduct: [],
		isFetching: false,
		updateSuccess: false,
		error: false,
		msg: "",
		msgDelete: "",
	},
	reducers: {
		getProductStart: (state) => {
			state.isFetching = true;
		},
		getProductSuccess: (state, action) => {
			state.currentProduct = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		getProductFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		getAllProductsStart: (state) => {
			state.isFetching = true;
		},
		getAllProductsSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.allProduct = action.payload;
		},
		getAllProductsFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		updateProductStart: (state) => {
			state.isFetching = true;
			state.updateSuccess = false;
		},
		updateProductSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentProduct = action.payload;
			state.updateSuccess = true;
		},
		updateProductFailed: (state) => {
			state.error = true;
			state.updateSuccess = false;
			state.isFetching = false;
		},
		deleteProductStart: (state) => {
			state.isFetching = true;
			state.msgDelete = "";
		},
		deleteProductSuccess: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.msgDelete = action.payload;
		},
		deleteProductFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msgDelete = "";
		},
		createProductStart: (state) => {
			state.isFetching = true;
		},
		createProductSuccess: (state, action) => {
			state.error = false;
			state.isFetching = false;
			state.msg = action.payload;
		},
		createProductFailed: (state, action) => {
			state.error = true;
			state.msg = action.payload;
		},
		searchProductsStart: (state) => {
			state.isFetching = true;
		},
		searchProductsSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.allProduct = action.payload;
		},
		searchProductsFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
	},
});

export const {
	createProduct,
	getProductStart,
	getProductFailed,
	getProductSuccess,
	getAllProductsFailed,
	getAllProductsSuccess,
	getAllProductsStart,
	updateProductFailed,
	updateProductSuccess,
	updateProductStart,
	deleteProductFailed,
	deleteProductStart,
	deleteProductSuccess,
	createProductFailed,
	createProductStart,
	createProductSuccess,
	searchProductsFailed,
	searchProductsStart,
	searchProductsSuccess,
} = UserSlice.actions;

export default UserSlice.reducer;
