import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCarts } from "~/api/cartApi";
import NoProductInCart from "./NoProductInCart";
import ShipmentDetail from "./ShipmentDetail";

function Payment() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.users.currentUser);
	const productInCart = useSelector((state) => state.cart.products);

	const countProductInCart = productInCart?.length;
	const userId = currentUser?._id;

	useEffect(() => {
		getCarts(dispatch, userId);
	}, []);

	return (
		<>
			{countProductInCart !== 0 ? (
				<ShipmentDetail />
			) : (
				<NoProductInCart />
			)}
		</>
	);
}

export default Payment;
