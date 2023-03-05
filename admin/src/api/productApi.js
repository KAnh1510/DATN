import { guest, user } from "../createInstance";
import { updateCategoryFailed } from "../slice/CategorySlice";
import {
	createProductFailed,
	createProductStart,
	createProductSuccess,
	deleteProductFailed,
	deleteProductStart,
	deleteProductSuccess,
	getAllProductsFailed,
	getAllProductsStart,
	getAllProductsSuccess,
	getProductFailed,
	getProductStart,
	getProductSuccess,
	searchProductsFailed,
	searchProductsStart,
	searchProductsSuccess,
	updateProductStart,
	updateProductSuccess,
} from "../slice/ProductSlice";

export const getAllProducts = async (dispatch, filterOption) => {
	dispatch(getAllProductsStart());
	try {
		let res;
		let cate = filterOption?.toLowerCase();
		if (filterOption === "all") {
			res = await guest.get("/products");
		} else {
			res = await guest.get(`/products/find/${cate}`);
		}
		dispatch(getAllProductsSuccess(res.data));
	} catch (error) {
		console.log(error);
		dispatch(getAllProductsFailed(error.response.data));
	}
};

export const getProduct = async (dispatch, id) => {
	dispatch(getProductStart());
	try {
		const res = await guest.post(`/products/find/${id}`);
		dispatch(getProductSuccess(res.data));
	} catch (err) {
		dispatch(getProductFailed(err.response.data));
	}
};

export const updateProduct = async (dispatch, id, products) => {
	dispatch(updateProductStart());
	try {
		const res = await user.post(`/products/update/${id}`, products);
		dispatch(updateProductSuccess(res.data));
	} catch (err) {
		dispatch(updateCategoryFailed(err.response.data));
	}
};

export const deleteProduct = async (dispatch, productId) => {
	dispatch(deleteProductStart());
	try {
		await user.delete(`/products/remove/${productId}`);

		dispatch(deleteProductSuccess());
	} catch (err) {
		dispatch(deleteProductFailed(err.response.data));
	}
};

export const createProduct = async (dispatch, navigate, newProduct) => {
	dispatch(createProductStart());
	try {
		await user.post("/products/create", newProduct);
		navigate("/products");
		dispatch(createProductSuccess());
	} catch (error) {
		dispatch(createProductFailed(error.response.data));
	}
};

export const searchProduct = async (dispatch, searchString) => {
	dispatch(searchProductsStart());
	try {
		const res = await guest.post("/products/search", searchString);
		dispatch(searchProductsSuccess(res.data));
	} catch (error) {
		dispatch(searchProductsFailed(error.response.data));
	}
};
