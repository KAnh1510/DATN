import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
	name: "products",
	initialState: {
		products: {
			allProducts: [],
			isFetching: false,
			error: false,
		},
		product: {
			currentProduct: [],
			isFetching: false,
			error: false,
		},
		search: {
			products: [],
			isFetching: false,
			error: false,
		},
	},
	reducers: {
		getProductsStart: (state) => {
			state.products.isFetching = true;
		},
		getProductsSuccess: (state, action) => {
			state.products.allProducts = action.payload;
			state.products.isFetching = false;
		},
		getProductsFailed: (state) => {
			state.products.isFetching = false;
			state.products.error = true;
		},

		getProductsByCatStart: (state) => {
			state.products.isFetching = true;
		},
		getProductsByCatSuccess: (state, action) => {
			state.products.allProducts = action.payload;
			state.products.isFetching = false;
		},
		getProductsByCatFailed: (state) => {
			state.products.isFetching = false;
			state.products.error = true;
		},

		getProductStart: (state) => {
			state.product.isFetching = true;
		},
		getProductSuccess: (state, action) => {
			state.product.isFetching = false;
			state.product.currentProduct = JSON.parse(
				JSON.stringify(action.payload)
			);
		},
		getProductFailed: (state) => {
			state.product.error = true;
			state.product.isFetching = false;
		},
		searchProductStart: (state) => {
			state.search.isFetching = false;
			state.search.isFetching = true;
		},
		searchProductSuccess: (state, action) => {
			state.search.isFetching = false;
			state.search.products = action.payload;
		},
		searchProductFailed: (state) => {
			state.search.error = true;
			state.search.isFetching = false;
		},
	},
});

export const {
	getProductsStart,
	getProductsFailed,
	getProductsSuccess,
	getProductStart,
	getProductFailed,
	getProductSuccess,
	searchProductFailed,
	searchProductStart,
	searchProductSuccess,
	getProductsByCatStart,
	getProductsByCatFailed,
	getProductsByCatSuccess,
} = ProductSlice.actions;

export default ProductSlice.reducer;
