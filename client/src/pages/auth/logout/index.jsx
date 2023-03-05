import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "~/api/authApi";
import Button from "~/components/button";
import { increaseQtn } from "~/slice/CartSlice";
import styles from "./Logout.module.scss";

const cx = classnames.bind(styles);

export const Logout = ({ setConfirmLogout }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		logOut(dispatch, navigate);
		dispatch(increaseQtn(0));
	};

	return (
		<div className={cx("wrapper")}>
			<div>Logout Confirmation?</div>
			<div>
				<Button className={cx("btn-logout")} onClick={handleLogout}>
					Confirm
				</Button>
				<Button
					className={cx("btn-logout")}
					onClick={() => setConfirmLogout(false)}
				>
					Cancel
				</Button>
			</div>
		</div>
	);
};

Logout.propTypes = {
	setConfirmLogout: PropTypes.func,
};
