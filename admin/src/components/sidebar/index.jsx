import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../api/authApi";
import { lightMode, darkMode } from "../../slice/DarkModeSlice";
import "./index.scss";

const SideBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const dark = useSelector((state) => state.darkMode.darkMode);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		logOut(dispatch, navigate);
	};

	return (
		<div className="sidebar">
			<div className="top">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="logo">Coldkid club</span>
				</Link>
			</div>
			<hr />
			<div className="center">
				<ul>
					<p className="title">MAIN</p>
					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/home"
						style={{ textDecoration: "none" }}
					>
						<li>
							<DashboardIcon className="icon" />
							<span>Dashboard</span>
						</li>
					</NavLink>
					<p className="title">LISTS</p>
					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/users"
						style={{ textDecoration: "none" }}
					>
						<li>
							<PersonOutlineIcon className="icon" />
							<span>Users</span>
						</li>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/categories"
						style={{ textDecoration: "none" }}
					>
						<li>
							<CategoryIcon className="icon" />
							<span>Category</span>
						</li>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/products"
						style={{ textDecoration: "none" }}
					>
						<li>
							<StoreIcon className="icon" />
							<span>Products</span>
						</li>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/orders"
						style={{ textDecoration: "none" }}
					>
						<li>
							<CreditCardIcon className="icon" />
							<span>Orders</span>
						</li>
					</NavLink>

					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/feedback"
						style={{ textDecoration: "none" }}
					>
						<li>
							<FeedbackOutlinedIcon className="icon" />
							<span>Feedback</span>
						</li>
					</NavLink>

					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/magazine"
						style={{ textDecoration: "none" }}
					>
						<li>
							<NewspaperIcon className="icon" />
							<span>Magazine</span>
						</li>
					</NavLink>

					<p className="title">USER</p>
					<NavLink
						className={({ isActive }) =>
							isActive ? "active" : " "
						}
						to="/profile"
						style={{ textDecoration: "none" }}
					>
						<li>
							<AccountCircleOutlinedIcon className="icon" />
							<span>Profile</span>
						</li>
					</NavLink>

					<li onClick={handleClickOpen}>
						<ExitToAppIcon className="icon" />
						<span>Logout</span>
					</li>
				</ul>
			</div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				className={dark ? "dialog-logout dark" : "dialog-logout"}
			>
				<DialogContent>
					<DialogContentText>Confirm logout ?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Disagree
					</Button>
					<Button onClick={handleLogout} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			<div className="bottom">
				<div
					className="colorOption"
					onClick={() => dispatch(lightMode())}
				></div>
				<div
					className="colorOption"
					onClick={() => dispatch(darkMode())}
				></div>
			</div>
		</div>
	);
};

export default SideBar;
