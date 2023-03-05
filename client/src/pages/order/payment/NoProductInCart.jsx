import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import DefaultLayout from "~/layout/DefaultLayout";
import styles from "./Payment.module.scss";

const cx = classnames.bind(styles);

const NoProductInCart = () => {
	return (
		<DefaultLayout>
			<div className={cx("main")}>
				<h1 style={{ textAlign: "center", marginBottom: "20px" }}>
					COLKIDSCLUBVN
				</h1>
				<div>You have no products in your shopping cart!</div>
				<div className={cx("sidebox-order_action")}>
					<p
						className={cx("link-continue")}
						style={{ textAlign: "left" }}
					>
						<Link to="/collection/all">
							<ion-icon name="arrow-undo-outline"></ion-icon>
							Continue shopping
						</Link>
					</p>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default NoProductInCart;
