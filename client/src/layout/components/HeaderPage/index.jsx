import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./HeaderPage.module.scss";

const cx = classnames.bind(styles);

function HeaderPage({ title }) {
	return (
		<div className={cx("header")}>
			<span>
				<Link to="/">Home</Link>
				<span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
			</span>
			<span>{title}</span>
		</div>
	);
}

HeaderPage.propTypes = {
	title: PropTypes.string.isRequired,
};

export default HeaderPage;
