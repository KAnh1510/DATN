import classnames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Image from "~/components/images";
import { VndFormat } from "~/utils";
import styles from "./ProductItem.module.scss";
const cx = classnames.bind(styles);

function ProductItem({ product }) {
	return (
		<Link to={`/products/${product?.name}`} className={cx("wrapper")}>
			<div className={cx("info")}>
				<p className={cx("name")}>{product?.name}</p>
				<span className={cx("prices")}>
					{VndFormat(product?.prices)}
				</span>
			</div>
			<Image
				className={cx("image")}
				src={product?.imgFront}
				alt={product?.name}
			/>
		</Link>
	);
}

ProductItem.propTypes = {
	product: PropTypes.object.isRequired,
};

export default React.memo(ProductItem);
