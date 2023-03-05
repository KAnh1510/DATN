/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from "prop-types";

import classnames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./HeaderAddress.module.scss";

const cx = classnames.bind(styles);

function HeaderAddress(props) {
	const { edit, setEdit } = props;
	const currentUser = useSelector((state) => state.users.currentUser);

	const handelShowEdit = () => {
		setEdit(!edit);
	};

	return (
		<div>
			<div className={cx("row")}>
				<div className={cx("col l-12 m-12")}>
					<div className={cx("address-title")}>
						<h3>
							<strong>{currentUser.username}</strong>
						</h3>
						<p className={cx("address-actions")}>
							<span className={cx("action-edit")} title="Edit">
								<Link to={""} onClick={handelShowEdit}>
									<i
										className={cx("fa fa-pencil-square-o")}
										aria-hidden="true"
									/>
								</Link>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

HeaderAddress.propTypes = {
	edit: PropTypes.bool,
	setEdit: PropTypes.func,
};

export default HeaderAddress;
