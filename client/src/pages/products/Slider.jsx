import classnames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import images from "~/assets/images";
import Images from "~/components/images";
import styles from "./Products.module.scss";
const cx = classnames.bind(styles);

const SliderProduct = ({ gallery }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1500,
		arrows: true,
	};
	return (
		<>
			<div className={cx("col", "l-1", "m-0", "c-0")}>
				<div className={cx("gallery")}>
					{gallery?.map((item) => (
						<div key={item._id} className={cx("gallery-item")}>
							<NavLink
								className={({ isActive }) =>
									isActive ? cx("active") : " "
								}
								to={``}
							>
								<Images src={item.src ?? images.noImage} />
							</NavLink>
						</div>
					))}
				</div>
			</div>
			<div className={cx("main-img", "col", "l-7", "m-0", "c-0")}>
				<Slider {...settings}>
					{gallery?.map((item) => (
						<Images
							key={item._id}
							src={item.src ?? images.noImage}
							className={cx("slick-item")}
						/>
					))}
				</Slider>
			</div>

			<div className={cx("col", "l-0", "m-2")}></div>
			<div
				className={cx("col", "l-0", "m-9", "c-12")}
				style={{ textAlign: "center" }}
			>
				<Slider {...settings}>
					{gallery?.map((item) => (
						<Images
							key={item._id}
							src={item.src ?? images.noImage}
							className={cx("slick-item")}
						/>
					))}
				</Slider>
			</div>
		</>
	);
};

export default SliderProduct;
