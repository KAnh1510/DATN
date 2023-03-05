import { createSlice } from "@reduxjs/toolkit";

export const MagazineSlice = createSlice({
	name: "magazine",
	initialState: {
		currentMagazine: [],
		allMagazine: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		getMagazineStart: (state) => {
			state.isFetching = true;
		},
		getMagazineSuccess: (state, action) => {
			state.currentMagazine = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		getMagazineFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		getAllMagazineStart: (state) => {
			state.isFetching = true;
		},
		getAllMagazineSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.allMagazine = action.payload;
		},
		getAllMagazineFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		updateMagazineStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateMagazineSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentMagazine = action.payload;
		},
		updateMagazineFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		createMagazineStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		createMagazineSuccess: (state) => {
			state.isFetching = false;
			state.error = false;
		},
		createMagazineFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
	},
});

export const {
	getAllMagazineFailed,
	getAllMagazineSuccess,
	getAllMagazineStart,
	updateMagazineFailed,
	updateMagazineSuccess,
	updateMagazineStart,
	getMagazineFailed,
	getMagazineStart,
	getMagazineSuccess,
	createMagazineFailed,
	createMagazineStart,
	createMagazineSuccess,
} = MagazineSlice.actions;

export default MagazineSlice.reducer;
