import { React } from "react";
import { useSelector } from "react-redux";
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import { Authentication } from "./authentication";
import Categories from "./pages/category";
import ChangePassword from "./pages/changepassword";
import Feedback from "./pages/feedback";
import ResetPassword from "./pages/forgotpassword";
import Home from "./pages/home";
import Login from "./pages/login";
import Magazine from "./pages/magazine";
import NewCategory from "./pages/newcategory";
import NewMagazine from "./pages/newmagazine";
import NewProduct from "./pages/newproducts";
import NewUser from "./pages/newuser";
import Orders from "./pages/orders";
import Products from "./pages/products";
import Profile from "./pages/profilepage";
import Revenue from "./pages/revenue";
import SingleCategory from "./pages/singlecategory";
import SingleFeedback from "./pages/singlefeedback";
import SingleMagazine from "./pages/singlemagazine";
import SingleOrder from "./pages/singleorder";
import SingleProduct from "./pages/singleproduct";
import SingleUser from "./pages/singleuser";
import Customers from "./pages/users";
import "./scss/dark.scss";

function App() {
	const darkMode = useSelector((state) => state.darkMode.darkMode);

	return (
		<div className={darkMode ? "app dark" : "app"}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/forgot-password"
						element={<ResetPassword />}
					/>
					<Route path="/" element={<PrivateWrapper />}>
						<Route path="home" element={<Home />} />

						<Route path="users">
							<Route index element={<Customers />} />
							<Route path=":userId" element={<SingleUser />} />
							<Route path="new" element={<NewUser />} />
						</Route>

						<Route path="categories">
							<Route index element={<Categories />} />
							<Route path="new" element={<NewCategory />} />
							<Route
								path=":categoryId"
								element={<SingleCategory />}
							/>
						</Route>

						<Route path="products">
							<Route index element={<Products />} />
							<Route
								path=":productId"
								element={<SingleProduct />}
							/>
							<Route path="new" element={<NewProduct />} />
						</Route>

						<Route path="orders">
							<Route index element={<Orders />} />
							<Route path=":orderId" element={<SingleOrder />} />
						</Route>

						<Route
							path="revenue/details"
							element={<Revenue />}
						></Route>

						<Route path="profile">
							<Route index element={<Profile />} />
							<Route
								path="change-password"
								element={<ChangePassword />}
							/>
						</Route>

						<Route path="feedback">
							<Route index element={<Feedback />} />
							<Route
								path=":feedbackId"
								element={<SingleFeedback />}
							/>
						</Route>

						<Route path="magazine">
							<Route index element={<Magazine />} />
							<Route path=":id" element={<SingleMagazine />} />
							<Route path="new" element={<NewMagazine />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

const PrivateWrapper = () => {
	const isAuthenticated = Authentication();
	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default App;
