import { createSlice } from "@reduxjs/toolkit";

export const MagazineSlice = createSlice({
	name: "magazine",
	initialState: {
		allMagazine: [],
		magazine: [],
		isFetchingAll: false,
		isFetching: false,
		error: "",
	},
	reducers: {
		getAllMagazineStart: (state) => {
			state.isFetchingAll = true;
		},
		getAllMagazineSuccess: (state, action) => {
			state.isFetchingAll = false;
			state.allMagazine = action.payload;
		},
		getAllMagazineFailed: (state, action) => {
			action.isFetchingAll = false;
			action.error = action.payload;
		},
		getMagazineStart: (state) => {
			state.isFetching = true;
		},
		getMagazineSuccess: (state, action) => {
			state.isFetching = false;
			state.magazine = action.payload;
		},
		getMagazineFailed: (state, action) => {
			action.isFetching = false;
			action.error = action.payload;
		},
	},
});

export const {
	getAllMagazineFailed,
	getAllMagazineStart,
	getAllMagazineSuccess,
	getMagazineStart,
	getMagazineSuccess,
	getMagazineFailed,
} = MagazineSlice.actions;

export default MagazineSlice.reducer;
