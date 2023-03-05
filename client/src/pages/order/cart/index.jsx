import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { deleteItemInCart, updateCart } from "~/api/cartApi";
import images from "~/assets/images";
import Button from "~/components/button";
import HeaderPage from "~/layout/components/HeaderPage";
import { increaseQtn } from "~/slice/CartSlice";
import { VndFormat } from "~/utils";
import styles from "./Cart.module.scss";

const cx = classnames.bind(styles);

function Cart() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [note, setNote] = useState("");
	const currentUser = useSelector((state) => state.users.currentUser);
	const userId = currentUser?._id;
	const carts = useSelector((state) => state.cart.carts);
	const productInCart = useSelector((state) => state.cart.products);
	const countProductInCart = productInCart?.length;

	const handleToPayment = () => {
		updateCart(dispatch, carts?._id, userId, productInCart, note);
		navigate(`/cart/payment/${userId}`);
	};

	const handleDeleteProduct = async (id) => {
		await deleteItemInCart(dispatch, id, userId);
		dispatch(increaseQtn());
	};

	return (
		<>
			<HeaderPage title={"Cart"} />
			<div className={cx("wrapper", "grid")}>
				<div className={cx("row")}>
					<div className={cx("col l-12 m-12 c-12", "header")}>
						<h1>Your cart</h1>
					</div>
				</div>
				{countProductInCart !== 0 ? (
					<div className={cx("row")}>
						<div className={cx("col l-7 m-8")}>
							{carts.products?.map((item) => {
								const {
									_id,
									name,
									prices,
									imgFront,
									quantity,
									color,
									size,
								} = item;
								return (
									<div
										className={cx("row", "info-prd")}
										key={_id}
									>
										<div className={cx("col l-2 m-3")}>
											<div className={cx("img-prd")}>
												<img
													src={
														imgFront ??
														images.noImage
													}
													alt={""}
												/>
											</div>
										</div>
										<div className={cx("col l-8 m-8")}>
											<div className={cx("info-text")}>
												<div className={cx("name-prd")}>
													<h3>{name}</h3>
													<FontAwesomeIcon
														icon={faTimes}
														onClick={() => {
															handleDeleteProduct(
																_id
															);
														}}
													/>
												</div>
												<p className={cx("prices")}>
													{VndFormat(prices)}
												</p>
												{color && (
													<span
														className={cx("color")}
													>
														<span
															style={{
																background: `${item.color}`,
															}}
														></span>
													</span>
												)}

												<span className={cx("size")}>
													{size ?? ""}
												</span>
												<div className={cx("quantity")}>
													Quantity:{" "}
													<span>{quantity}</span>
												</div>
											</div>
										</div>
									</div>
								);
							})}

							<div
								className={cx("row")}
								style={{
									gap: 10,
								}}
							>
								<div className={cx("col l-5 m-12 c-12")}>
									<div className={cx("note")}>
										<h4 className={cx("title")}>
											Order notes
										</h4>
										<div>
											<textarea
												placeholder="Note"
												type="text"
												id="note"
												value={note}
												name="note"
												className={cx("checkout-note")}
												onChange={(e) =>
													setNote(e.target.value)
												}
											/>
										</div>
									</div>
								</div>

								<div className={cx("col l-0 m-12 c-12")}>
									<div className={cx("sidebox-order")}>
										<div
											className={cx(
												"sidebox-order-inner"
											)}
										>
											<div
												className={cx(
													"sidebox-order_title"
												)}
											>
												<h3>Information Order</h3>
											</div>
											<div
												className={cx(
													"sidebox-order_total"
												)}
											>
												<p>
													Total money:
													<span
														className={cx(
															"total-price"
														)}
													>
														{VndFormat(
															carts?.amount
														)}
													</span>
												</p>
											</div>
											<div
												className={cx(
													"sidebox-order_text"
												)}
											>
												<p>
													Shipping fee will be
													calculated at the checkout
													page.
													<br />
													You can also enter the
													discount code at the
													checkout page.
												</p>
											</div>
											<div
												className={cx(
													"sidebox-order_action"
												)}
											>
												<Button
													className={cx(
														"btncart-checkout"
													)}
													onClick={handleToPayment}
												>
													Pay
												</Button>
												<p
													className={cx(
														"link-continue"
													)}
												>
													<Link to="/collection/all">
														<ion-icon name="arrow-undo-outline"></ion-icon>
														Continue shopping
													</Link>
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className={cx("col l-7 m-12 c-12")}>
									<div className={cx("policy")}>
										<h4 className={cx("title")}>
											Purchase Policy
										</h4>
										<ul>
											<li>
												Products can be exchanged only
												once, and do not support
												payment.
											</li>
											<li>
												The product has all the tags and
												is unused.
											</li>
											<li>
												Original-price products are
												exchanged in 30 days across the
												system system.
											</li>
											<li>
												Sale products only support size
												change (if the store is still
												available) in 7 days throughout
												the system.
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className={cx("col l-4 m-0 c-0")}>
							<div className={cx("sidebox-order")}>
								<div className={cx("sidebox-order-inner")}>
									<div className={cx("sidebox-order_title")}>
										<h3>Information Order</h3>
									</div>
									<div className={cx("sidebox-order_total")}>
										<p>
											Total money:
											<span className={cx("total-price")}>
												{VndFormat(carts?.amount)}
											</span>
										</p>
									</div>
									<div className={cx("sidebox-order_text")}>
										<p>
											Shipping fee will be calculated at
											the checkout page.
											<br />
											You can also enter the discount code
											at the checkout page.
										</p>
									</div>
									<div className={cx("sidebox-order_action")}>
										<Button
											className={cx("btncart-checkout")}
											onClick={handleToPayment}
										>
											Pay
										</Button>
										<p className={cx("link-continue")}>
											<Link to="/collection/all">
												<ion-icon name="arrow-undo-outline"></ion-icon>
												Continue shopping
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<>
						<div>You have no products in your shopping cart!</div>
						<div className={cx("sidebox-order_action")}>
							<p
								className={cx("link-continue")}
								style={{ textAlign: "left" }}
							>
								<Link to="/collection/all">
									<ion-icon name="arrow-undo-outline"></ion-icon>
									Continue shopping
								</Link>
							</p>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Cart;
