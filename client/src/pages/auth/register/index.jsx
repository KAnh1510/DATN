import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import classnames from "classnames/bind";
import { registerUser } from "~/api/authApi";
import Button from "~/components/button";
import Captcha from "~/components/captcha";
import PageLoginRegister from "~/layout/components/PageLoginRegister";
import styles from "./Register.module.scss";

const cx = classnames.bind(styles);

function Register() {
	const isContainsLowercase = /^(?=.*[a-z])/;
	const isContainsNumber = /^(?=.*[0-9])/;
	const isValidLength = /^.{8,16}$/;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [newUser, setNewUser] = useState({
		email: "",
		username: "",
		name: "",
		password: "",
	});
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [passwordInput, setPasswordInput] = useState({
		password: "",
		confirmPassword: "",
	});

	const success = useSelector((state) => state.auth.success);
	const isValidEmail = useSelector((state) => state.auth.error);

	const handlePasswordChange = (e) => {
		const passwordInputValue = e.target.value.trim();
		const passwordInputFieldName = e.target.name;
		const newPasswordInput = {
			...passwordInput,
			[passwordInputFieldName]: passwordInputValue,
		};
		setPasswordInput(newPasswordInput);
	};

	const handleValidation = (e) => {
		const passwordInputFieldName = e.target.name;
		// for confirm password
		if (
			passwordInputFieldName === "confirmPassword" ||
			(passwordInputFieldName === "password" &&
				passwordInput.confirmPassword.length > 0)
		) {
			if (passwordInput.confirmPassword !== passwordInput.password) {
				setConfirmPasswordError("The password does not match");
			} else {
				setConfirmPasswordError("");
				setNewUser({
					...newUser,
					password: passwordInput.password,
				});
			}
		}
	};

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		registerUser(newUser, dispatch, navigate);
	};

	return (
		<PageLoginRegister
			title="Register"
			children={
				<div className={cx("user-box")}>
					<form id="customer_register">
						<div className={cx("input-form")}>
							<input
								required
								type="name"
								name="customer[username]"
								id="customer_username"
								onChange={(e) => {
									setNewUser({
										...newUser,
										username: e.target.value,
									});
								}}
								placeholder="Username"
							/>
						</div>
						<div className={cx("input-form")}>
							<input
								required
								type="name"
								name="customer[name]"
								id="customer_name"
								onChange={(e) => {
									setNewUser({
										...newUser,
										name: e.target.value,
									});
								}}
								placeholder="Name"
							/>
						</div>

						<div className={cx("input-form")}>
							<input
								required
								type="email"
								name="customer[email]"
								id="customer_email"
								placeholder="Email"
								onChange={(e) => {
									setNewUser({
										...newUser,
										email: e.target.value,
									});
								}}
							/>
							{isValidEmail ? (
								<div style={{ color: "red" }}>
									{isValidEmail}
								</div>
							) : (
								<></>
							)}
						</div>

						<div className={cx("input-form")}>
							<div className="form-group mb-4">
								<input
									type="password"
									value={passwordInput.password}
									onChange={handlePasswordChange}
									onKeyUp={handleValidation}
									name="password"
									placeholder="Enter your password"
								/>
								<ul className={cx("valid-wrapper")}>
									<li
										className={cx(
											isContainsLowercase.test(
												passwordInput.password
											)
												? "valid-password"
												: "invalid-password"
										)}
									>
										A lowercase letter
									</li>
									<li
										className={cx(
											isContainsNumber.test(
												passwordInput.password
											)
												? "valid-password"
												: "invalid-password"
										)}
									>
										At least one Digit
									</li>
									<li
										className={cx(
											isValidLength.test(
												passwordInput.password
											)
												? "valid-password"
												: "invalid-password"
										)}
									>
										At least 8 characters
									</li>
								</ul>
							</div>
						</div>

						<div className={cx("input-form")}>
							<div className="form-group mb-4">
								<input
									type="password"
									value={passwordInput.confirmPassword}
									onChange={handlePasswordChange}
									onKeyUp={handleValidation}
									name="confirmPassword"
									placeholder="Confirm password"
								/>
								<p
									className="text-danger"
									style={{ color: "red" }}
								>
									{confirmPasswordError}
								</p>
							</div>
						</div>

						{success !== false ? (
							<p style={{ marginTop: "10px", color: "blue" }}>
								{success}
							</p>
						) : (
							<></>
						)}

						<Captcha />

						<div className={cx("action-account")}>
							<div className={cx("btn-submit")}>
								<Button>
									<input
										type="submit"
										value="Register"
										onClick={handleSubmitRegister}
									/>
								</Button>
							</div>
						</div>
						<div className={cx("return-login")}>
							<Link to="/login" title="Login">
								<FontAwesomeIcon icon={faArrowLeftLong} />
								<span>Login</span>
							</Link>
						</div>
					</form>
				</div>
			}
		></PageLoginRegister>
	);
}

export default Register;
