import { createSlice } from "@reduxjs/toolkit";

export const ContactSlice = createSlice({
	name: "feedback",
	initialState: {
		feedback: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		createFeedbackStart: (state) => {
			state.isFetching = true;
		},
		createFeedbackSuccess: (state, action) => {
			state.isFetching = false;
			state.feedback = action.payload;
		},
		createFeedbackFailed: (state, action) => {
			action.isFetching = false;
			action.error = true;
		},
	},
});

export const {
	createFeedbackFailed,
	createFeedbackStart,
	createFeedbackSuccess,
} = ContactSlice.actions;

export default ContactSlice.reducer;
