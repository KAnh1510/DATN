import { guest } from "~/createInstance";
import {
	getAllMagazineFailed,
	getAllMagazineStart,
	getAllMagazineSuccess,
	getMagazineFailed,
	getMagazineStart,
	getMagazineSuccess,
} from "~/slice/MagazineSlice";

export const getAllMagazine = async (dispatch) => {
	dispatch(getAllMagazineStart());
	try {
		const res = await guest.get("/magazine/");
		dispatch(getAllMagazineSuccess(res.data));
	} catch (error) {
		dispatch(getAllMagazineFailed(error.res.data));
	}
};

export const getMagazine = async (dispatch, id) => {
	dispatch(getMagazineStart());
	try {
		const res = await guest.get(`/magazine/${id}`);
		dispatch(getMagazineSuccess(res.data));
	} catch (error) {
		dispatch(getMagazineFailed(error.res.data));
	}
};
