import { createSlice } from "@reduxjs/toolkit";

export const DarkModeSlice = createSlice({
	name: "darkMode",
	initialState: { darkMode: false },
	reducers: {
		lightMode: (state) => {
			state.darkMode = false;
		},
		darkMode: (state) => {
			state.darkMode = true;
		},
		toggleMode: (state) => {
			state.darkMode = !state.darkMode;
		},
	},
});

export const { lightMode, darkMode, toggleMode } = DarkModeSlice.actions;

export default DarkModeSlice.reducer;
