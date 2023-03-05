import classnames from "classnames/bind";
import styles from "./User.module.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "~/api/cartApi";
import { increaseQtn } from "~/slice/CartSlice";
import MenuMobile from "../../layout/components/MenuMobile";
import { CartIcon, SearchIcon } from "../icons";
import CartSideBar from "./cartsidebar";
import Search from "./search";

const cx = classnames.bind(styles);

function User() {
	const dispatch = useDispatch();
	const [showSearch, setShowSearch] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	const currentUser = useSelector((state) => state.users.currentUser);
	const quantity = useSelector((state) => state.cart.totalQtn);

	useEffect(() => {
		getCart(dispatch, currentUser?._id);
		dispatch(increaseQtn());
	}, []);

	return (
		<>
			<div className={showSearch ? cx("showing") : cx("search-wrapper")}>
				<Search setShowSearch={setShowSearch} />
			</div>
			<div className={showCart ? cx("showing") : cx("search-wrapper")}>
				<CartSideBar setShowCart={setShowCart} />
			</div>
			<div className={showMenu ? cx("showing") : cx("search-wrapper")}>
				<MenuMobile setShowMenu={setShowMenu} />
			</div>
			<div className={cx("choose", "row")}>
				<div
					className={cx("choose-item", "col l-2 m-2 c-0")}
					onClick={() => {
						setShowSearch(true);
					}}
				>
					<SearchIcon />
				</div>
				{currentUser && (
					<div
						className={cx("choose-item", "cart", "col m-2 l-2")}
						onClick={() => {
							setShowCart(true);
						}}
					>
						<CartIcon />
						<span className={cx("quantity")}>
							{quantity === 0 ? "+" : quantity}
						</span>
					</div>
				)}
				<span className="col l-0">
					<div
						className={cx("menu")}
						onClick={() => {
							setShowMenu(true);
						}}
					>
						<ion-icon
							name="menu-outline"
							style={{
								width: "2.6rem",
								height: "2.6rem",
								cursor: "pointer",
							}}
						></ion-icon>
					</div>
				</span>
			</div>
		</>
	);
}

export default React.memo(User);
