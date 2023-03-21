import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart } from "~/api/cartApi";
import images from "~/assets/images";
import Images from "~/components/images";
import "./index.scss";

const CheckoutSuccess = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.users.currentUser);
	const carts = useSelector((state) => state.cart.carts);

	useEffect(() => {
		deleteCart(dispatch, carts._id);
	}, []);

	return (
		<div className="checkout-success">
			<div className="title-success">Your order has been received</div>
			<div className="icon-success">
				<Images src={images.checkout} />
			</div>

			<div className="subtitle-success">Thank for your purchase!</div>

			<div className="checkout-success-navigate">
				<Link to="/collection/all">Continue shopping</Link>
				<Link to={`/orders/${currentUser._id}`}>View orders</Link>
			</div>
		</div>
	);
};

export default CheckoutSuccess;
