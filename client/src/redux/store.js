import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AuthReducer from "~/slice/AuthSlice";
import CartReducer from "~/slice/CartSlice";
import CategoryReducer from "~/slice/CategorySlice";
import ContactReducer from "~/slice/ContactSlice";
import MagazineReducer from "~/slice/MagazineSlice";
import OrderReducer from "~/slice/OrderSlice";
import ProductReducer from "~/slice/ProductSlice";
import UserReducer from "~/slice/UserSlice";

const rootReducer = combineReducers({
	auth: AuthReducer,
	users: UserReducer,
	categories: CategoryReducer,
	products: ProductReducer,
	orders: OrderReducer,
	cart: CartReducer,
	questions: ContactReducer,
	magazine: MagazineReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

export default store;
