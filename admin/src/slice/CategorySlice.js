import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
	name: "category",
	initialState: {
		currentCategory: [],
		allCategory: [],
		isFetching: false,
		error: false,
		msg: "",
	},
	reducers: {
		getCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getCategorySuccess: (state, action) => {
			state.currentCategory = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		getCategoryFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		getAllCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getAllCategorySuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.allCategory = action.payload;
		},
		getAllCategoryFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
		},
		updateCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateCategorySuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentCategory = action.payload;
		},
		updateCategoryFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		deleteCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.msg = "";
		},
		deleteCategorySuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.msg = action.payload;
		},
		deleteCategoryFailed: (state) => {
			state.error = true;
			state.isFetching = false;
			state.msg = "";
		},
		createCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		createCategorySuccess: (state) => {
			state.isFetching = false;
			state.error = false;
		},
		createCategoryFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
	},
});

export const {
	getAllCategoryFailed,
	getAllCategorySuccess,
	getAllCategoryStart,
	updateCategoryFailed,
	updateCategorySuccess,
	updateCategoryStart,
	deleteCategoryFailed,
	deleteCategoryStart,
	deleteCategorySuccess,
	createCategoryFailed,
	createCategoryStart,
	createCategorySuccess,
	getCategoryFailed,
	getCategoryStart,
	getCategorySuccess,
} = UserSlice.actions;

export default UserSlice.reducer;
