import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./PageLoginRegister.module.scss";

const cx = classnames.bind(styles);

function PageLoginRegister({ title, children }) {
	return (
		<div className={cx("grid")}>
			<div className={cx("mobile", "row")}>
				<div className={cx("col l-6 m-12 c-12")}>
					<div className={cx("wrapper")}>
						<div className={cx("title")}>
							<h1>{title}</h1>
						</div>
					</div>
				</div>
				<div className={cx("col l-6 m-12 c-12")}>
					<div className={cx("content")}>{children}</div>
				</div>
			</div>
		</div>
	);
}

PageLoginRegister.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

export default PageLoginRegister;
