import { user } from "../createInstance";
import {
	getAllFeedbackFailed,
	getAllFeedbackStart,
	getAllFeedbackSuccess,
	getFeedbackFailed,
	getFeedbackStart,
	getFeedbackSuccess,
} from "../slice/FeedbackSlice";

export const getAllFeedback = async (dispatch) => {
	dispatch(getAllFeedbackStart());
	try {
		const res = await user.get("/feedback/all");
		dispatch(getAllFeedbackSuccess(res.data));
	} catch (error) {
		dispatch(getAllFeedbackFailed(error.response.data));
	}
};

export const getFeedback = async (dispatch, id) => {
	dispatch(getFeedbackStart());
	try {
		const res = await user.get(`/feedback/getbyid/${id}`);
		dispatch(getFeedbackSuccess(res.data));
	} catch (error) {
		dispatch(getFeedbackFailed(error.response.data));
	}
};
