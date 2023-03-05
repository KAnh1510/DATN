import { guest, user } from "../createInstance";
import {
	createCategoryFailed,
	updateCategoryFailed,
} from "../slice/CategorySlice";
import {
	createMagazineStart,
	createMagazineSuccess,
	getAllMagazineFailed,
	getAllMagazineStart,
	getAllMagazineSuccess,
	getMagazineFailed,
	getMagazineStart,
	getMagazineSuccess,
	updateMagazineStart,
	updateMagazineSuccess,
} from "../slice/MagazineSlice";

export const getAllMagazine = async (dispatch) => {
	dispatch(getAllMagazineStart());
	try {
		const res = await guest.get("/magazine");
		dispatch(getAllMagazineSuccess(res.data));
	} catch (error) {
		dispatch(getAllMagazineFailed());
	}
};

export const getMagazine = async (dispatch, id) => {
	dispatch(getMagazineStart());
	try {
		const res = await guest.get(`/magazine/${id}`);
		dispatch(getMagazineSuccess(res.data));
	} catch (error) {
		dispatch(getMagazineFailed());
	}
};

export const updateMagazine = async (dispatch, id, magazine) => {
	dispatch(updateMagazineStart());
	try {
		const res = await user.post(`/magazine/update/${id}`, magazine);
		dispatch(updateMagazineSuccess(res.data));
	} catch (err) {
		dispatch(updateCategoryFailed());
	}
};

export const createMagazine = async (dispatch, navigate, magazine) => {
	dispatch(createMagazineStart());
	try {
		await user.post("/magazine/create", magazine);
		navigate("/magazine");
		dispatch(createMagazineSuccess());
	} catch (err) {
		dispatch(createCategoryFailed());
	}
};
