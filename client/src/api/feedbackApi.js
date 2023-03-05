import { guest } from "~/createInstance";
import {
	createFeedbackFailed,
	createFeedbackStart,
	createFeedbackSuccess,
} from "~/slice/ContactSlice";

export const createFeedback = async (dispatch, info) => {
	dispatch(createFeedbackStart());
	try {
		const res = await guest.post("/feedback/create", { ...info });
		dispatch(createFeedbackSuccess(res.data));
	} catch (error) {
		dispatch(createFeedbackFailed());
	}
};
