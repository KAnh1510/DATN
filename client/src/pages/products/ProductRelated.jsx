import classnames from "classnames/bind";
import { useSelector } from "react-redux";
import ShowListProduct from "~/components/productinlist";
import styles from "./Products.module.scss";

const cx = classnames.bind(styles);

const ProductRelated = () => {
	const productList = useSelector(
		(state) => state.products.products.allProducts
	);
	const currentProduct = useSelector(
		(state) => state.products.product.currentProduct
	);

	return (
		<div className={cx("row")}>
			<div className={cx("title", "col", "l-12", "m-12", "c-12")}>
				<h2>Related products</h2>
			</div>
			<div className={cx("content", "wrapper-products")}>
				{productList.map(
					(item) =>
						currentProduct.categories === item.categories && (
							<div key={item._id} className={cx("product")}>
								<ShowListProduct item={item} />
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default ProductRelated;
