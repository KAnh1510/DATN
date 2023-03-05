import { guest, user } from "../createInstance";
import {
	createCategoryFailed,
	createCategoryStart,
	createCategorySuccess,
	deleteCategoryFailed,
	deleteCategoryStart,
	deleteCategorySuccess,
	getAllCategoryFailed,
	getAllCategoryStart,
	getAllCategorySuccess,
	getCategoryFailed,
	getCategoryStart,
	getCategorySuccess,
} from "../slice/CategorySlice";
import { getAllProductsSuccess } from "../slice/ProductSlice";

export const getAllCategory = async (dispatch) => {
	dispatch(getAllCategoryStart());
	try {
		const res = await guest.get("/categories");
		dispatch(getAllCategorySuccess(res.data));
	} catch (error) {
		dispatch(getAllCategoryFailed());
	}
};

export const createCategory = async (dispatch, navigate, newCate) => {
	dispatch(createCategoryStart());
	try {
		const res = await user.post("/categories/create", newCate);
		dispatch(createCategorySuccess(res.data));
		navigate("/categories");
	} catch (error) {
		dispatch(createCategoryFailed());
	}
};

export const getCategory = async (dispatch, id) => {
	dispatch(getCategoryStart());
	try {
		const res = await guest.get(`/categories/find/${id}`);
		const cate = res.data.name.toLowerCase();
		const resProduct = await guest.get(`/products/find/${cate}`);
		dispatch(getCategorySuccess(res.data));
		dispatch(getAllProductsSuccess(resProduct.data));
	} catch (error) {
		dispatch(getCategoryFailed());
	}
};

export const deleteCategory = async (dispatch, id) => {
	dispatch(deleteCategoryStart());
	try {
		const res = await user.delete(`/categories/remove/${id}`);
		dispatch(deleteCategorySuccess(res.data));
	} catch (error) {
		dispatch(deleteCategoryFailed());
	}
};
