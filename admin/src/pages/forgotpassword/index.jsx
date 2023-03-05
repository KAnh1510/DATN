import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	KeyboardDoubleArrowLeftRoundedIcon,
	SendIcon,
} from "../../assets/icon";
import { guest } from "../../createInstance";
import "./index.scss";

const ResetPassword = () => {
	const isContainsLowercase = /^(?=.*[a-z])/;
	const isContainsNumber = /^(?=.*[0-9])/;
	const isValidLength = /^.{8,16}$/;
	const [passwordInput, setPasswordInput] = useState({
		password: "",
		confirmPassword: "",
	});
	const [email, setEmail] = useState("");
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
			passwordInput.password.length !== 0 &&
			passwordInput.confirmPassword.length !== 0
		) {
			await guest
				.post("/users/change-password/send-code", { email })
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

	return (
		<div className="recovered-password">
			<div className="reset-password">Reset Password</div>
			<form>
				<div className="input-recover">
					<TextField
						style={{ width: "100%", margin: "5px" }}
						type="email"
						size="30"
						name="email"
						label="Email"
						id="recover-email"
						variant="outlined"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextField
						type="password"
						style={{ width: "100%", margin: "5px" }}
						value={passwordInput.password}
						onChange={handlePasswordChange}
						onKeyUp={handleValidation}
						name="password"
						size="30"
						label="New password"
						variant="outlined"
						required
					/>

					<ul className={"valid-wrapper"}>
						<li
							className={
								isContainsLowercase.test(passwordInput.password)
									? "valid-password"
									: "invalid-password"
							}
						>
							A lowercase letter
						</li>
						<li
							className={
								isContainsNumber.test(passwordInput.password)
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

					<TextField
						type="password"
						style={{ width: "100%", margin: "5px" }}
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
					<Link to="/" className="req_pass">
						<KeyboardDoubleArrowLeftRoundedIcon className="arrow-icon" />{" "}
						Login
					</Link>
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
		</div>
	);
};
export default ResetPassword;
