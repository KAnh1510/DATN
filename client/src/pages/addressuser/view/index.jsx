import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styles from "./ViewAddress.module.scss";

const cx = classnames.bind(styles);
function ViewAddress({ className }) {
	const currentUser = useSelector((state) => state.users.currentUser);

	return (
		<div className={cx(className)}>
			<div className={cx("view-address")}>
				<strong className={cx("name")}>{currentUser?.username}</strong>

				<div className={cx("info")}>
					<div className={cx("info-item")}>
						Address:
						<span>{currentUser?.address}</span>
					</div>
					<div className={cx("info-item")}>
						Phone:
						<span>{currentUser?.phoneNumber}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

ViewAddress.propTypes = {
	className: PropTypes.string,
};

export default ViewAddress;
