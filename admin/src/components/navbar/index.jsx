/* eslint-disable react-hooks/exhaustive-deps */
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images/";
import { constants } from "../../constants";
import { guest } from "../../createInstance";
import { loginSuccess } from "../../slice/AuthSlice";
import { toggleMode } from "../../slice/DarkModeSlice";
import { createUser } from "../../slice/UserSlice";
import Notify from "../notify";
import "./index.scss";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.users.currentUser);

	const login = async (newUser) => {
		const user = await guest.post("/auth/login", newUser);
		localStorage.setItem(constants.userToken, user.data.accessToken);
		dispatch(loginSuccess());
		dispatch(createUser(user.data));
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
		<div className="navbar">
			<div className="wrapper">
				<div className="items">
					<div className="item">
						<DarkModeOutlinedIcon
							className="icon"
							onClick={() => dispatch(toggleMode())}
						/>
					</div>
					<Notify />
					<div
						className="item"
						onClick={() => navigate("/profile")}
						style={{ cursor: "pointer" }}
					>
						<img
							src={currentUser.avatar ?? images.noImageUser}
							alt=""
							className="avatar"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
