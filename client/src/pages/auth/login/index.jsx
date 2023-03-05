import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "~/api/authApi";
import Button from "~/components/button";
import Captcha from "~/components/captcha";
import ResetPassword from "~/components/resetpassword";
import PageLoginRegister from "~/layout/components/PageLoginRegister";
import { increaseQtn } from "~/slice/CartSlice";
import styles from "./Login.module.scss";

const cx = classnames.bind(styles);

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [forgotPassword, setForgotPassword] = useState(false);

	const errMes = useSelector((state) => state.users.msg);
	const error = useSelector((state) => state.users.error);

	const handleLogin = async (e) => {
		e.preventDefault();
		const newUser = {
			email,
			password: password,
		};
		await loginUser(newUser, dispatch, navigate);
		dispatch(increaseQtn());
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<PageLoginRegister
			title="Log in"
			children={
				forgotPassword ? (
					<ResetPassword setForgotPassword={setForgotPassword} />
				) : (
					<div className={cx("user-box")}>
						<Form>
							<Form.Group className={cx("input-form")}>
								<Form.Control
									required
									type="email"
									name="customer[email]"
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
								/>
							</Form.Group>
							<Form.Group className={cx("input-form")}>
								<Form.Control
									required
									type="password"
									name="customer[password]"
									id="customer_password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="Enter your password"
									size="16"
								/>
							</Form.Group>

							{error && <p style={{ color: "red" }}>{errMes}</p>}
							<Captcha />
							<div className={cx("action-account")}>
								<div
									className={cx("btn-submit", "l-6 m-6 c-12")}
								>
									<Button onClick={handleLogin}>Login</Button>
								</div>
								<div
									className={cx(
										"res-pass",
										"col l-6 m-6 c-12"
									)}
								>
									<p
										title="Password"
										onClick={() =>
											setForgotPassword(!forgotPassword)
										}
									>
										Forgot password
									</p>
									<br className="col c-0" />
									&nbsp;or&nbsp;
									<Link to="/register" title="Register">
										Register
									</Link>
								</div>
							</div>
						</Form>
					</div>
				)
			}
		/>
	);
};
