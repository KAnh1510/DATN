import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCart } from "~/api/cartApi";
import Images from "~/components/images";
import { guest } from "~/createInstance";
import { LISTSIDEBAR } from "~/data";
import { Logout } from "~/pages/auth";
import { createUserSuccess } from "~/slice/UserSlice";
import styles from "./SideBar.module.scss";

const cx = classnames.bind(styles);

function SideBar() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [confirmLogout, setConfirmLogout] = useState(false);
	const currentUser = useSelector((state) => state.users.currentUser);

	const login = async (newUser) => {
		const user = await guest.post("/auth/login", newUser);
		localStorage.setItem("accessToken", user.data.accessToken);
		dispatch(createUserSuccess(user.data));
		getCart(dispatch, currentUser._id);
	};

	useEffect(() => {
		guest
			.get("/auth/get-info")
			.then((res) => {
				if (res.data !== "Not_login") {
					login(res.data);
				}
			})
			.catch((err) => {});
	}, []);

	return (
		<div className={cx("wrapper")}>
			<Link to="/" title={t("logo")}>
				<Images
					src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
					alt="Logo"
					className={cx("logo")}
				/>
			</Link>
			<ul className={cx("sideBar-list")}>
				{LISTSIDEBAR.map((item, index) => {
					return (
						<li key={index}>
							<NavLink
								to={item.to}
								title={t(item.title)}
								className={({ isActive }) =>
									isActive ? cx("active") : " "
								}
							>
								{t(item.title)}
							</NavLink>
						</li>
					);
				})}
				<li>
					{currentUser._id ? (
						<div className={cx("login")}>
							<div
								onClick={() => setConfirmLogout(true)}
								title={t("logout")}
								className={cx("login-item")}
							>
								{t("logout")}
							</div>
							<NavLink
								to={`/account/${currentUser?._id}`}
								className={({ isActive }) =>
									isActive ? cx("active") : " "
								}
							>
								{t("hi")} {currentUser?.name}
							</NavLink>
							{confirmLogout ? (
								<Logout setConfirmLogout={setConfirmLogout} />
							) : (
								<></>
							)}
						</div>
					) : (
						<NavLink
							to="/login"
							title={t("login")}
							className={({ isActive }) =>
								isActive ? cx("active") : " "
							}
						>
							{t("login")}
						</NavLink>
					)}
				</li>
			</ul>
		</div>
	);
}

export default SideBar;
