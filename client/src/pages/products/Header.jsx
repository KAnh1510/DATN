import classnames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import User from "~/components/user";
import styles from "./Products.module.scss";

const cx = classnames.bind(styles);

const Header = ({ categories, name }) => {
	const navigate = useNavigate();
	return (
		<div className={cx("header")}>
			<div>
				<span>
					<Link to="/">Home</Link>
					<span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
				</span>
				<span
					className={cx("header_type")}
					onClick={() => {
						navigate(`/collection/${categories}`);
					}}
				>
					{categories} &nbsp;&nbsp;/&nbsp;&nbsp;
				</span>
				<span>{name}</span>
			</div>
			<div>
				<User />
			</div>
		</div>
	);
};

export default Header;
