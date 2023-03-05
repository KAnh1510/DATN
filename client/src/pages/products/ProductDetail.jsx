import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCart, getCart, updateCart } from "~/api/cartApi";
import Button from "~/components/button";
import { guest } from "~/createInstance";
import { increaseQtn } from "~/slice/CartSlice";
import ProductDescription from "./ProductDescription";
import styles from "./Products.module.scss";

const cx = classnames.bind(styles);

const ProductDetail = ({ currentProduct }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [colorOrder, setColorOrder] = useState();
	const [sizeOrder, setSizeOrder] = useState();
	const [counter, setCounter] = useState(1);
	const [messSuccess, setMessSuccess] = useState(false);
	const [messErr, setMessErr] = useState(false);
	const [forgotSize, setForgotSize] = useState(false);
	const [forgotColor, setForgotColor] = useState(false);
	const currentUser = useSelector((state) => state.users.currentUser);
	const userId = currentUser?._id;
	const { _id, name, subtle, gallery, size, color, prices } = currentProduct;

	const handleAddCard = async (e) => {
		e.preventDefault();
		if (currentUser._id) {
			if (color && !colorOrder) {
				setForgotColor(true);
			} else if (size.length > 0 && !sizeOrder) {
				setForgotSize(true);
			} else {
				await createCart(dispatch, {
					userId,
					productId: _id,
					name,
					prices,
					imgFront: gallery[0].src,
					color: colorOrder,
					size: sizeOrder,
					quantity: counter,
					note: "",
				});
				await getCart(dispatch, userId);
				dispatch(increaseQtn());
				setMessSuccess(true);
				navigate(`/cart/${userId}`);
			}
		} else setMessErr(true);
	};
	return (
		<div className={cx("col", "l-4", "m-12", "c-12")}>
			<div className={cx("product_info")}>
				<div className={cx("product_title")}>
					<h1>{name}</h1>
					<p>SKU: {subtle}</p>
				</div>

				<div className={cx("product_prices")}>
					<p>
						{prices?.toLocaleString("vi", {
							style: "currency",
							currency: "VND",
						})}
					</p>
				</div>

				<form>
					<div className={cx("product_color")}>
						{color?.map((item) => (
							<div className={cx("color_element")} key={item._id}>
								<input
									type="radio"
									required
									className={cx("input")}
									id={`swatch-${item.idColor}`}
									name={`option${item.idColor}`}
									value={item.idColor}
									onChange={(e) => {
										setColorOrder(e.target.value);
										setForgotColor(false);
									}}
									checked={colorOrder === item.idColor}
								/>
								<label htmlFor={`swatch-${item.idColor}`}>
									<span
										style={{
											background: `${item.idColor}`,
										}}
									></span>
								</label>
							</div>
						))}
					</div>
					{forgotColor && (
						<div
							style={{
								marginTop: "10px",
								color: "red",
							}}
						>
							You are not select a color.
						</div>
					)}
					<div className={cx("product_size")}>
						<div className={cx("select_size")}>
							{size?.map((item) => (
								<div
									className={cx("size_element")}
									key={item._id}
								>
									<input
										type="radio"
										required
										className={cx("input")}
										id={`swatch-${item.name}`}
										name={`option${item.name}`}
										value={item.name}
										onChange={(e) => {
											setSizeOrder(e.target.value);
											setForgotSize(false);
										}}
										checked={sizeOrder === item.name}
									/>
									<label htmlFor={`swatch-${item.name}`}>
										<span> SIZE {item.name}</span>
									</label>
								</div>
							))}
						</div>
					</div>
					{forgotSize && (
						<div
							style={{
								marginTop: "10px",
								color: "red",
							}}
						>
							You are not select a size.
						</div>
					)}
				</form>

				<div className={cx("selector_action")}>
					<form>
						<div
							className={cx("value-button", "decrease")}
							onClick={() => {
								counter > 1
									? setCounter(counter - 1)
									: setCounter(1);
							}}
							value="Decrease Value"
						>
							-
						</div>
						<input
							type="number"
							id="number"
							value={counter}
							onChange={(e) => setCounter(e.target.value)}
							className={cx("number")}
						/>
						<div
							className={cx("value-button", "increase")}
							onClick={() => setCounter(counter + 1)}
							value="Increase Value"
						>
							+
						</div>
					</form>
					<div className={cx("add-card")}>
						<Button onClick={handleAddCard}>Add to cart </Button>
					</div>
				</div>

				{messErr ? (
					<div style={{ marginTop: "10px", color: "red" }}>
						Please login to add products!
					</div>
				) : (
					<></>
				)}

				{messSuccess ? (
					<div style={{ marginTop: "10px", color: "blue" }}>
						The product has been added to the cart!
					</div>
				) : (
					<></>
				)}

				<ProductDescription />
			</div>
		</div>
	);
};

export default ProductDetail;
