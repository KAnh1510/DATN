// api/collectionApi.js
import { guest } from "~/createInstance";
import {
	getCategoriesFailed,
	getCategoriesStart,
	getCategoriesSuccess,
} from "~/slice/CategorySlice";

export const getAllCategories = async (dispatch) => {
	dispatch(getCategoriesStart());
	try {
		const response = await guest.get("/categories/");
		dispatch(getCategoriesSuccess(response.data));
	} catch (error) {
		dispatch(getCategoriesFailed());
	}
};
