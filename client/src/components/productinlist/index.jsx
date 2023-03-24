import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import images from "~/assets/images";
import Images from "~/components/images";
import { VndFormat } from "~/utils";
import styles from "./ProductInList.module.scss";

const cx = classnames.bind(styles);
function ShowListProduct({ item }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/products/${item._id}`);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return item?.deleted ? null : (
		<>
			{item?.quality !== 0 ? (
				<div className={cx("prd_img")} onClick={handleClick}>
					<Images
						src={item.gallery[0]?.src ?? images.noImage}
						alt={item.name}
						className={cx("img_show")}
					/>
					<Images
						src={item.gallery[1]?.src ?? images.noImage}
						alt={item.name}
						className={cx("img_hidden")}
					/>
				</div>
			) : (
				<div className={cx("prd_img")}>
					<Images
						src={item.gallery[0]?.src ?? images.noImage}
						alt={item.name}
						className={cx("product-sold-out")}
					/>
					<div className={cx("sold-out")}>
						<span>SOLD OUT</span>
					</div>
				</div>
			)}

			<div className={cx("prd_desc")}>
				<div
					onClick={item.quality !== 0 ? handleClick : () => {}}
					className={cx("prd_name")}
				>
					{item.name}
				</div>
				<div className={cx("prd_price")}>{VndFormat(item?.prices)}</div>
			</div>
		</>
	);
}

ShowListProduct.propTypes = {
	item: PropTypes.object.isRequired,
};

export default ShowListProduct;
