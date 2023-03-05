import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "~/pages/auth";
import styles from "./PageAccountAddress.module.scss";

const cx = classnames.bind(styles);

function PageAccountAddress({ title, children }) {
	const [confirmLogout, setConfirmLogout] = useState(false);
	const currentUser = useSelector((state) => state.users?.currentUser);

	const handleLogout = () => {
		setConfirmLogout(true);
	};

	return (
		<div className={cx("grid")}>
			<div className={cx("row")}>
				<div className={cx("col l-12 m-12")}>
					<div className={cx("header")}>
						<h1>{title}</h1>
					</div>
				</div>
				<div className={cx("container", "grid")}>
					<div className={cx("row")}>
						<div className={cx("col l-3 m-5")}>
							<div className={cx("title")}>
								<h3>Account</h3>
							</div>
							<div className={cx("account-list")}>
								<ul>
									<li>
										<Link
											to={`/account/${currentUser?._id}`}
										>
											Account Information
										</Link>
									</li>
									<li>
										<Link
											to={`/account/address/${currentUser?._id}`}
										>
											Address Information
										</Link>
									</li>
									<li>
										<a href="#!" onClick={handleLogout}>
											Logout
										</a>
									</li>
									{confirmLogout ? (
										<Logout
											setConfirmLogout={setConfirmLogout}
										/>
									) : (
										<></>
									)}
								</ul>
							</div>
						</div>
						<div className={cx("col m-7")}>{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

PageAccountAddress.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default PageAccountAddress;
