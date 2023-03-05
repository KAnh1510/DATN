import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Magazine from "./pages/magazine";
import Shop from "./pages/shop";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import Address from "./pages/addressuser";
import { Account, Login } from "./pages/auth";
import Register from "./pages/auth/register";
import Categories from "./pages/collections";
import News from "./pages/magazine/news";
import Cart from "./pages/order/cart";
import OrderDone from "./pages/order/orderdone";
import Payment from "./pages/order/payment";
import CheckoutSuccess from "./pages/order/payment/checkoutsuccess";
import Products from "./pages/products";
import Recruitment from "./pages/recruitment";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="collection" element={<Shop />}>
						<Route path=":type" element={<Categories />} />
					</Route>
					<Route path="magazine" element={<Magazine />} />
					<Route path="magazine/:id" element={<News />} />
					<Route path="recruitment" element={<Recruitment />} />
					<Route
						path="products/:id"
						element={
							<DefaultLayout>
								<Products />
							</DefaultLayout>
						}
					/>
					<Route
						path="cart/:id"
						element={
							<DefaultLayout>
								<Cart />
							</DefaultLayout>
						}
					/>
					<Route path="cart/payment/:id" element={<Payment />} />
					<Route
						path="orders/:id"
						element={
							<DefaultLayout>
								<OrderDone />
							</DefaultLayout>
						}
					/>
					<Route
						path="checkout-success"
						element={
							<DefaultLayout>
								<CheckoutSuccess />
							</DefaultLayout>
						}
					/>
					<Route
						path="account/:id"
						element={
							<DefaultLayout>
								<Account />
							</DefaultLayout>
						}
					/>
					<Route
						path="/login"
						element={
							<DefaultLayout>
								<Login />
							</DefaultLayout>
						}
					/>
					<Route
						path="/register"
						element={
							<DefaultLayout>
								<Register />
							</DefaultLayout>
						}
					/>
					<Route
						path="account/address/:id"
						element={
							<DefaultLayout>
								<Address />
							</DefaultLayout>
						}
					/>

					{publicRoutes.map((route, index) => {
						let Page = route.component;
						let Layout = DefaultLayout;

						return (
							<Route
								key={index}
								path={`pages${route.path}`}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
