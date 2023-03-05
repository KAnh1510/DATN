import classnames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getOrder } from "~/api/ordersApi";
import { getProduct } from "~/api/productApi";
import Header from "./Header";
import ProductDetail from "./ProductDetail";
import ProductRelated from "./ProductRelated";
import styles from "./Products.module.scss";
import SliderProduct from "./Slider";

const cx = classnames.bind(styles);

export default function Products() {
	const dispatch = useDispatch();
	const params = useParams();

	const currentProduct = useSelector(
		(state) => state.products.product.currentProduct
	);
	const { name, gallery, categories } = currentProduct;
	const currentUser = useSelector((state) => state.users.currentUser);
	const userId = currentUser?._id;

	useEffect(() => {
		getProduct(dispatch, params.id);
		getOrder(dispatch, userId, { status: 0 });
	}, [params.id]);

	return (
		<div className={cx("grid")}>
			<div className={cx("wrapper")}>
				<Header categories={categories} name={name} />
				<div className={cx("content", "row")}>
					<SliderProduct gallery={gallery} />
					<ProductDetail currentProduct={currentProduct} />
				</div>
				<ProductRelated />
			</div>
		</div>
	);
}
