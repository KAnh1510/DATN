import { createSlice } from "@reduxjs/toolkit";

export const FeedbackSlice = createSlice({
	name: "feedback",
	initialState: {
		currentFeedback: [],
		allFeedback: [],
		isFetching: false,
		error: false,
		msg: "",
	},
	reducers: {
		getFeedbackStart: (state) => {
			state.isFetching = true;
			state.msg = "";
		},
		getFeedbackSuccess: (state, action) => {
			state.currentFeedback = action.payload;
			state.isFetching = false;
			state.error = false;
			state.msg = "";
		},
		getFeedbackFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msg = action.payload;
		},
		getAllFeedbackStart: (state) => {
			state.isFetching = true;
			state.msg = "";
		},
		getAllFeedbackSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.msg = "";
			state.allFeedback = action.payload;
		},
		getAllFeedbackFailed: (state, action) => {
			state.error = true;
			state.isFetching = false;
			state.msg = action.payload;
		},
		updateFeedbackStart: (state) => {
			state.isFetching = true;
		},
		updateFeedbackSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentFeedback = action.payload;
		},
		updateFeedbackFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
	},
});

export const {
	getAllFeedbackFailed,
	getAllFeedbackSuccess,
	getAllFeedbackStart,
	updateFeedbackFailed,
	updateFeedbackSuccess,
	updateFeedbackStart,
	getFeedbackFailed,
	getFeedbackStart,
	getFeedbackSuccess,
} = FeedbackSlice.actions;

export default FeedbackSlice.reducer;
