import classnames from "classnames/bind";
import PropTypes from "prop-types";
import Search from "~/components/user/search";
import Footer from "../../pages/footer";
import HeaderMobile from "../components/HeaderMobile";
import SideBar from "../components/SideBar";
import styles from "./DefaultLayout.module.scss";

const cx = classnames.bind(styles);

function DefaultLayout({ children }) {
	return (
		<div className="grid">
			<div className="row">
				<div className="col l-2 m-0 c-0">
					<SideBar />
				</div>
				<div className="col l-10 m-12 c-12">
					<div className="col l-0 m-12 c-12">
						<HeaderMobile />
					</div>
					<div className="col l-0 m-0 c-12">
						<Search />
					</div>
					<div className={cx("content")}>{children}</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

DefaultLayout.propTypes = {
	children: PropTypes.node,
};

export default DefaultLayout;
