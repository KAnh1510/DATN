import { Snackbar } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCart } from "~/api/cartApi";
import { createOrders, getOrder } from "~/api/ordersApi";
import images from "~/assets/images";
import Button from "~/components/button";
import Images from "~/components/images";
import { guest } from "~/createInstance";
import HeaderPage from "~/layout/components/HeaderPage";
import { Logout } from "~/pages/auth";
import { getAmountProduct, increaseQtn } from "~/slice/CartSlice";
import styles from "./Payment.module.scss";
import PaymentInMobile from "./PaymentInMobile";
import ProductAmount from "./ProductAmount";

const cx = classnames.bind(styles);

const ShipmentDetail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [addressUser, setAddressUser] = useState("");
	const [phoneNumberUser, setPhoneNumberUser] = useState("");
	const [confirmLogout, setConfirmLogout] = useState(false);
	const [paymentOption, setPaymentOption] = useState("1");
	const [copySuccess, setCopySuccess] = useState(false);

	const { carts } = useSelector((state) => state.cart);
	const currentUser = useSelector((state) => state.users.currentUser);
	const productInCart = useSelector((state) => state.cart.products);
	const productList = useSelector(
		(state) => state.products.products.allProducts
	);

	const { username, email, address, phoneNumber, discount } = currentUser;
	const userId = currentUser._id;

	const handleLogout = () => {
		setConfirmLogout(true);
	};

	const handlePayment = () => {
		createOrder();
		navigate(`/orders/${userId}`);
	};

	const handleCheckout = async () => {
		await guest
			.post("/stripe/create-checkout-session", {
				cartItems: productInCart,
				userId: userId,
			})
			.then(async (response) => {
				if (response.data.url) {
					window.location.href = response.data.url;
					console.log(response.data.url);
					if (
						response.data.url ===
						"http://localhost:3000/checkout-success"
					) {
						await deleteCart(dispatch, carts?._id);
					}
				}
			})
			.catch((err) => console.log(err.message));
	};

	const createOrder = async () => {
		createOrders(dispatch, {
			note: carts.note,
			userId,
			username,
			products: carts.products,
			amount: carts.amount,
			address: addressUser,
			phoneNumber: phoneNumberUser,
			paymentOption: parseInt(paymentOption),
		});
		await deleteCart(dispatch, carts?._id);
		await getOrder(dispatch, userId, { status: 0 });
		dispatch(increaseQtn());
	};

	const handlePaymentOption = (e) => {
		e.persist();
		setPaymentOption(e.target.value);
	};

	const copyToClipBoard = async (copyMe) => {
		try {
			await navigator.clipboard.writeText(copyMe);
			setCopySuccess(true);
		} catch (err) {
			setCopySuccess(false);
		}
	};

	return (
		<div className={cx("wrapper")}>
			<div className={cx("row")} style={{ height: "100%" }}>
				<div className={cx("l-7 m-12 c-12", "main")}>
					<div className={cx("main-header")}>
						<h1>COLKIDSCLUBVN</h1>
						<HeaderPage title="Payment methods" />
					</div>
					<PaymentInMobile
						productInCart={productInCart}
						productList={productList}
					/>
					<div className={cx("main-content")}>
						<div className={cx("section")}>
							<div className={cx("section-header")}>
								<h2>Shipment Details</h2>
							</div>
							<div className={cx("section-content")}>
								<div
									className={cx(
										"logged-in-customer-information"
									)}
								>
									<div
										className={cx(
											"logged-in-customer-information-avatar-wrapper"
										)}
									>
										<Images src="khongcogi" />
									</div>
									<p
										className={cx(
											"logged-in-customer-information-paragraph"
										)}
									>
										{username} ({email})
										<br />
										<button onClick={handleLogout}>
											Log out
										</button>
									</p>
								</div>

								{confirmLogout && (
									<Logout
										setConfirmLogout={setConfirmLogout}
									/>
								)}
								<Form>
									<Form.Group className="mb-3">
										<Form.Control
											placeholder="Full Name"
											className={cx("form-control")}
											autoCapitalize="off"
											spellCheck="false"
											readOnly
											type="text"
											disabled
											id="username"
											name="username"
											defaultValue={
												username ? username : ""
											}
											autoComplete="false"
										/>
									</Form.Group>
									{paymentOption !== "2" ? (
										<>
											<Form.Group className="mb-3">
												<Form.Control
													placeholder="Phone number"
													size="30"
													maxLength="15"
													required
													className={cx(
														"form-control"
													)}
													type="tel"
													id="phoneNumber"
													name="phoneNumber"
													value={
														phoneNumber
															? phoneNumber
															: phoneNumberUser
													}
													onChange={(e) =>
														setPhoneNumberUser(
															e.target.value
														)
													}
												/>
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Control
													type="text"
													placeholder="Address"
													size="30"
													className={cx(
														"form-control"
													)}
													required
													id="address"
													name="address"
													value={
														address
															? address
															: addressUser
													}
													onChange={(e) =>
														setAddressUser(
															e.target.value
														)
													}
												/>
											</Form.Group>
										</>
									) : (
										<></>
									)}
								</Form>
							</div>
						</div>
						<div className={cx("section")}>
							<div className={cx("section-header")}>
								<h2>Payment methods</h2>
							</div>
							<Form.Group controlId="paymentOption">
								<Form.Check
									value="1"
									type="radio"
									aria-label="radio 1"
									label="Payment on delivery"
									onChange={handlePaymentOption}
									checked={paymentOption === "1"}
								/>
								<Form.Check
									value="2"
									type="radio"
									aria-label="radio 2"
									label="Payment via card"
									onChange={handlePaymentOption}
									checked={paymentOption === "2"}
								/>
								<Form.Check
									value="3"
									type="radio"
									aria-label="radio 3"
									label="Payment Bank Transfer"
									onChange={handlePaymentOption}
									checked={paymentOption === "3"}
								/>
							</Form.Group>
						</div>
						<div className={cx("footer")}>
							<Link
								to={`/cart/${userId}`}
								style={{ color: "var(--primary)" }}
							>
								Cart
							</Link>
							{paymentOption === "1" && (
								<Button type="submit" onClick={handlePayment}>
									CHECKOUT NOW
								</Button>
							)}
							{paymentOption === "2" && (
								<Button type="submit" onClick={handleCheckout}>
									CHECKOUT NOW
								</Button>
							)}
							{paymentOption === "3" && (
								<Button type="submit" onClick={handlePayment}>
									CHECKOUT NOW
								</Button>
							)}
						</div>
						{paymentOption === "3" && (
							<div>
								<div className={cx("payment_method")}>
									<div style={{ color: "var(--primary)" }}>
										<div>
											Account number:{" "}
											<strong
												onClick={() =>
													copyToClipBoard(
														"1029614353"
													)
												}
												className={cx("account_number")}
											>
												1029614353
											</strong>
											<Snackbar
												message="Copied!"
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "center",
												}}
												autoHideDuration={1000}
												onClose={() =>
													setCopySuccess(false)
												}
												open={copySuccess}
											/>
										</div>
										<div>
											Bank: <strong>Vietcombank</strong>
										</div>
									</div>
									<div>Or scan</div>
									<div className={cx("payment_method-qr")}>
										<Images src={images.qr} />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<ProductAmount discount={discount} />
			</div>
		</div>
	);
};

export default ShipmentDetail;
