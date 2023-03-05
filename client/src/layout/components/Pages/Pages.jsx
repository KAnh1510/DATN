import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeaderPage from "../HeaderPage";
import styles from "./Pages.module.scss";

const cx = classnames.bind(styles);

function Pages({ children, title }) {
	return (
		<div className={cx("wrapper")}>
			<HeaderPage title={title} />
			<div className={cx("container")}>
				<div className={cx("sideBar")}>
					<h3>List of pages</h3>
					<ul>
						<li>
							<Link to="/pages/about">About</Link>
						</li>
						<li>
							<Link to="/pages/return-policy">Return Policy</Link>
						</li>
						<li>
							<Link to="/pages/private-policy">
								Private Policy
							</Link>
						</li>
						<li>
							<Link to="/pages/service">Terms of Service</Link>
						</li>
						<li>
							<Link to="/pages/contact">Contact</Link>
						</li>
					</ul>
				</div>
				<div className={cx("content")}>
					<h1>{title}</h1>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
}

Pages.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

export default Pages;
