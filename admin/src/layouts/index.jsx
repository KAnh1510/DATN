import { React } from "react";
import { Navbar, SideBar } from "../components";
import "./index.scss";

const Layout = ({ children, className }) => {
	return (
		<div className="list">
			<SideBar />
			<div className="listContainer">
				<Navbar />
				<div className={className}>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
