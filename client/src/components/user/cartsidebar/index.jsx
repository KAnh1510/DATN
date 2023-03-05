import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteItemInCart, getCart } from "~/api/cartApi";
import Button from "~/components/button";
import { CartIcon } from "~/components/icons";
import { increaseQtn } from "~/slice/CartSlice";
import { VndFormat } from "~/utils";
import styles from "./CartSideBar.module.scss";

const cx = classnames.bind(styles);

function CartSideBar({ setShowCart }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const listProductInCart = useSelector((state) => state.cart.products);
	const carts = useSelector((state) => state.cart.carts);
	const currentUser = useSelector((state) => state.users.currentUser);
	const userId = currentUser?._id;

	const handleDeleteItemInCart = async (id) => {
		await deleteItemInCart(dispatch, id, userId);
		dispatch(increaseQtn());
	};

	const handelClose = () => {
		setShowCart(false);
	};

	useEffect(() => {
		getCart(dispatch, userId);
	}, []);

	return (
		<div className={cx("wrapper")}>
			<div className={cx("header")}>
				<p className={cx("title")}>Cart</p>
				<div className={cx("close")}>
					<FontAwesomeIcon
						icon={faTimesCircle}
						onClick={handelClose}
					/>
				</div>
			</div>
			<div className={cx("cart-info")}>
				{listProductInCart?.length === 0 ? (
					<div className={cx("cart-empty")}>
						<div className={cx("cart-icon")}>
							<CartIcon width="5rem" height="5rem" />
						</div>
						<p className={cx("note")}>
							There are currently no products!!
						</p>
					</div>
				) : (
					<>
						{listProductInCart?.map((item) => {
							const {
								_id,
								productId,
								name,
								prices,
								quantity,
								imgFront,
								color,
								size,
							} = item;
							return (
								<div className={cx("products")} key={_id}>
									<div className={cx("product-img")}>
										<img src={imgFront} alt="imgFront" />
									</div>
									<div className={cx("product-info")}>
										<Link
											className={cx("name")}
											to={`/products/${productId}`}
										>
											{name}
										</Link>
										{color && (
											<div
												className={cx("color")}
												style={{
													display: "block",
													margin: "10px 0",
													fontSize: "1.4rem",
												}}
											>
												<p
													style={{
														background: `${color}`,
														width: "20px",
														height: "20px",
														border: "1px solid #888",
														borderRadius: "50%",
													}}
												></p>
											</div>
										)}
										{size && (
											<div className={cx("size")}>
												Size {size}
											</div>
										)}
										<div className={cx("footer")}>
											<p className={cx("num")}>
												{quantity}
											</p>
											<span className={cx("prices")}>
												{VndFormat(prices)}
											</span>
										</div>
									</div>
									<span>
										<FontAwesomeIcon
											icon={faXmark}
											onClick={() =>
												handleDeleteItemInCart(_id)
											}
										/>
									</span>
								</div>
							);
						})}
						<div className={cx("total")}>
							<p className={cx("title")}>Total money:</p>
							<p className={cx("cost")}>
								{VndFormat(carts?.amount)}
							</p>
						</div>
					</>
				)}

				<div className={cx("payment")}>
					<div className={cx("button")}>
						<Button
							onClick={() => {
								navigate(`/cart/${userId}`);
								window.scrollTo({
									top: 0,
									behavior: "smooth",
								});
							}}
						>
							View cart
						</Button>
						<Button
							onClick={() => {
								if (currentUser) {
									navigate(`/cart/payment/${userId}`);
									window.scrollTo({
										top: 0,
										behavior: "smooth",
									});
								}
							}}
						>
							Pay
						</Button>
					</div>
					<div className={cx("button")}>
						<Button
							onClick={() => {
								navigate(`/orders/${userId}`);
								window.scrollTo({
									top: 0,
									behavior: "smooth",
								});
							}}
						>
							View your order
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

CartSideBar.propTypes = {
	setShowCart: PropTypes.func,
};

export default CartSideBar;
