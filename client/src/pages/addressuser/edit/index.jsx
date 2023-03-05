/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from "prop-types";
import { useState } from "react";

import { faHome, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "~/api/userApi";
import Button from "~/components/button";
import styles from "./EditAddress.module.scss";

const cx = classnames.bind(styles);

function EditAddress(props) {
	const { className, setEdit } = props;
	const [successMess, setSuccessMes] = useState(false);

	const currentUser = useSelector((state) => state.users.currentUser);
	const [values, setValues] = useState(currentUser);
	const dispatch = useDispatch();

	const handleUpdateUser = (e) => {
		e.preventDefault();
		updateUser(
			dispatch,
			values?.username,
			values?.address,
			values?.phoneNumber,
			currentUser?._id
		);
		setSuccessMes(true);
	};

	return (
		<div className={cx(className)}>
			<div className={cx("edit-address")}>
				<Form>
					<div className={cx("input-group")}>
						<span className={cx("input-group-addon")}>
							<FontAwesomeIcon icon={faUser} />
						</span>
						<input
							type="text"
							id="address_name"
							className={cx("form-control", "textbox")}
							name="address[name]"
							size="40"
							value={values.username}
							placeholder="Name"
							onChange={(e) =>
								setValues({
									...values,
									username: e.target.value,
								})
							}
						/>
					</div>
					<div className={cx("input-group")}>
						<span className={cx("input-group-addon")}>
							<FontAwesomeIcon icon={faHome} />
						</span>
						<input
							type="text"
							id="address_address"
							className={cx("form-control", "textbox")}
							name="address[address]"
							size="40"
							placeholder="Please enter detailed address..."
							value={values?.address}
							onChange={(e) =>
								setValues({
									...values,
									address: e.target.value,
								})
							}
						/>
					</div>
					<div className={cx("input-group")}>
						<span className={cx("input-group-addon")}>
							<FontAwesomeIcon icon={faPhone} />
						</span>
						<input
							type="text"
							id="address_phone"
							className={cx("form-control", "textbox")}
							name="address[phone]"
							size="40"
							value={values?.phoneNumber}
							placeholder="Phone Number"
							onChange={(e) =>
								setValues({
									...values,
									phoneNumber: e.target.value,
								})
							}
						/>
					</div>

					{successMess ? (
						<p style={{ marginTop: "10px", color: "blue" }}>
							Account update successful!
						</p>
					) : (
						<></>
					)}

					<div className={cx("action_bottom")}>
						<Button
							className={cx("btn-update")}
							onClick={handleUpdateUser}
						>
							Update
						</Button>
						<span>
							{" "}
							or{" "}
							<span
								className={cx("btn-cancel")}
								onClick={() => {
									setEdit(false);
								}}
							>
								Cancel
							</span>
						</span>
					</div>
				</Form>
			</div>
		</div>
	);
}

EditAddress.propTypes = {
	className: PropTypes.string,
	setEdit: PropTypes.func,
};

export default EditAddress;
