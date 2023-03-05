import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	KeyboardDoubleArrowLeftRoundedIcon,
	SendIcon,
} from "../../assets/icon";
import { guest } from "../../createInstance";
import Layout from "../../layouts";
import "./index.scss";

const ChangePassword = () => {
	const { email } = useSelector((state) => state.users.currentUser);
	const isContainsLowercase = /^(?=.*[a-z])/;
	const isContainsNumber = /^(?=.*[0-9])/;
	const isValidLength = /^.{8,16}$/;
	const [passwordInput, setPasswordInput] = useState({
		password: "",
		confirmPassword: "",
		currentPassword: "",
	});
	const [password, setPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [isVerificationCode, setIsVerificationCode] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const [isEmail, setIsEmail] = useState("");
	const [msgCodeWrong, setMsgCodeWrong] = useState("");

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
				setPassword(passwordInput.password);
			}
		}
	};

	const handleSendEmail = async (e) => {
		e.preventDefault();
		setIsFetching(true);
		if (
			email.length !== 0 &&
			passwordInput.currentPassword.length !== 0 &&
			passwordInput.password.length !== 0 &&
			passwordInput.confirmPassword.length !== 0
		) {
			await guest
				.post("/users/change-password/send-code", {
					email,
					currentPassword: passwordInput.currentPassword,
				})
				.then((res) => {
					if (res.status === 200) {
						setIsVerificationCode(true);
					} else if (res.status === 201) {
						setIsEmail(res.data);
						setIsVerificationCode(false);
					}
					setIsFetching(false);
				})
				.catch((error) => {
					setIsEmail(error.response.data);
					setIsVerificationCode(false);
					setIsFetching(false);
				});
		}
	};

	const handleVerification = async (e) => {
		e.preventDefault();
		await guest
			.post("/users/change-password", {
				code: verificationCode,
				email: email,
				password: password,
			})
			.then((res) => {
				if (res.status === 200) {
					setMsgCodeWrong(res.data);
					setIsVerificationCode(false);
				}
			})
			.catch((error) => {
				setMsgCodeWrong(error.response.data);
			});
	};

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	return (
		<Layout className="profile change-password">
			<div className="profile-title">Change Password</div>
			<form>
				<div className="input-recover">
					<TextField
						style={{ width: "80%", margin: "5px" }}
						type="email"
						size="30"
						name="email"
						id="recover-email"
						variant="outlined"
						label="Email"
						defaultValue={email}
						inputProps={{ readOnly: true }}
					/>

					<TextField
						// type="password"
						style={{ width: "80%", margin: "5px" }}
						value={passwordInput.currentPassword}
						onChange={handlePasswordChange}
						type={showPassword ? "text" : "password"}
						name="currentPassword"
						size="30"
						label="Current password"
						variant="outlined"
						required
						InputProps={{
							// <-- This is where the toggle button is added.
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<div className="new-password">
						<TextField
							type="password"
							style={{ width: "66%", margin: "5px" }}
							value={passwordInput.password}
							onChange={handlePasswordChange}
							name="password"
							size="30"
							label="New password"
							variant="outlined"
							required
						/>

						<ul className={"valid-wrapper"}>
							<li
								className={
									isContainsLowercase.test(
										passwordInput.password
									)
										? "valid-password"
										: "invalid-password"
								}
							>
								A lowercase letter
							</li>
							<li
								className={
									isContainsNumber.test(
										passwordInput.password
									)
										? "valid-password"
										: "invalid-password"
								}
							>
								At least one Digit
							</li>
							<li
								className={
									isValidLength.test(passwordInput.password)
										? "valid-password"
										: "invalid-password"
								}
							>
								At least 8 characters
							</li>
						</ul>
					</div>

					<TextField
						type="password"
						style={{ width: "80%", margin: "5px" }}
						value={passwordInput.confirmPassword}
						onChange={handlePasswordChange}
						onKeyUp={handleValidation}
						name="confirmPassword"
						label="Confirm password"
						variant="outlined"
						required
					/>
					{confirmPasswordError !== "" && (
						<p className="text-danger" style={{ color: "#D0021B" }}>
							{confirmPasswordError}
						</p>
					)}

					<br />
				</div>
				{isEmail !== "" ? (
					<div style={{ color: "#D0021B" }}>{isEmail}</div>
				) : (
					<></>
				)}
				<div style={{ color: "gray", marginBottom: 8 }}>
					{msgCodeWrong}
				</div>
				<div className="action-account">
					<div className="btn-submit">
						<LoadingButton
							size="small"
							onClick={(e) => handleSendEmail(e)}
							endIcon={<SendIcon />}
							loading={isFetching}
							disabled={isVerificationCode}
							loadingPosition="end"
							variant="contained"
							color="secondary"
						>
							<span>Send</span>
						</LoadingButton>
					</div>
					<Link to="/profile" className="req_pass">
						<KeyboardDoubleArrowLeftRoundedIcon className="arrow-icon" />{" "}
						Back
					</Link>
				</div>

				{isVerificationCode ? (
					<div className="verification-code">
						<div>
							Verification code has been emailed, please check it!
						</div>
						<div className="verification-code-input">
							<div>Verification Code: </div>
							<input
								type="text"
								maxLength={6}
								onChange={(e) => {
									setVerificationCode(e.target.value);
								}}
								value={verificationCode}
							/>
						</div>
						<Stack
							direction="row"
							justifyContent="space-between"
							mt={4}
						>
							<Button
								variant="contained"
								color="secondary"
								onClick={(e) => handleSendEmail(e)}
							>
								Received again!
							</Button>
							<Button
								variant="contained"
								color="success"
								size="large"
								disabled={verificationCode === ""}
								onClick={(e) => handleVerification(e)}
							>
								Done
							</Button>
						</Stack>
					</div>
				) : (
					<></>
				)}
			</form>
		</Layout>
	);
};

export default ChangePassword;
