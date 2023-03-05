import classnames from "classnames/bind";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageAccountAddress from "~/layout/components/PageAccountAddress";
import styles from "./Account.module.scss";

const cx = classnames.bind(styles);

export function Account() {
	const currentUser = useSelector((state) => state.users?.currentUser);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<PageAccountAddress title="Your Account">
			<div className={cx("col l-12")}>
				<div className={cx("info-account")}>
					<p className={cx("title-detail")}>Account Information</p>
					<div className={cx("account")}>
						<h2>Name: {currentUser?.username}</h2>
						<h3>Email: {currentUser?.email}</h3>
					</div>
				</div>

				<div className={cx("address")}>
					<Link
						to={`/account/address/${currentUser?._id}`}
						className={cx("view-address")}
					>
						View Address
					</Link>
				</div>
			</div>
		</PageAccountAddress>
	);
}
