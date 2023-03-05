import classnames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Products.module.scss";

const cx = classnames.bind(styles);

const ProductDescription = () => {
	const currentProduct = useSelector(
		(state) => state.products.product.currentProduct
	);
	const { size, color } = currentProduct;
	return (
		<div className={cx("desc")}>
			<h2>Description: </h2>- Material: Cotton
			{size && (
				<>
					<br />- Size:&nbsp;
					{size?.map((item) => (
						<span key={item._id}> {item.name}</span>
					))}
				</>
			)}
			{color && (
				<>
					<br />- Color:
					{color?.map((item) => (
						<span key={item._id}> {item.nameColor}</span>
					))}
				</>
			)}
			<br />
			- Unique Design
			<br />
			- Easy to match with different outfits and accessories.
			<br />
			_________________
			<br />
			Information about ColkidsClub:
			<br />
			- Products designed and manufactured by CND
			<br />- Using suitable fabrics and accessories for long-lasting use.
			<br />
			- All products from CND are guaranteed as shown in the picture
			<br />- Good product quality 100%
			<br />- Nationwide delivery, receive the goods, and then pay
			<br />
			_________________
			<br />
			Note: please record a clip of opening the box. The shop only accepts
			returns for products when faulty or wrong products are delivered
			(there must be an unboxing clip) . CYou can change the size within 3
			days from the date of receipt
			<br />
			Wish you have exciting experiences and choose for yourself
			satisfactory products when coming to CND ^^.
		</div>
	);
};

export default ProductDescription;
