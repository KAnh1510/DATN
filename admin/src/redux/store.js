import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../slice/AuthSlice";
import CategoryReducer from "../slice/CategorySlice";
import DarkModeReducer from "../slice/DarkModeSlice";
import FeedbackReducer from "../slice/FeedbackSlice";
import MagazineReducer from "../slice/MagazineSlice";
import OrderReducer from "../slice/OrderSlice";
import ProductReducer from "../slice/ProductSlice";
import UsersReducer from "../slice/UserSlice";

const store = configureStore({
	reducer: {
		auth: AuthReducer,
		users: UsersReducer,
		darkMode: DarkModeReducer,
		products: ProductReducer,
		categories: CategoryReducer,
		orders: OrderReducer,
		feedback: FeedbackReducer,
		magazine: MagazineReducer,
	},
	devTools: true,
});

export default store;
