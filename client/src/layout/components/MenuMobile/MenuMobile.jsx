import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Images from "~/components/images";
import { LISTSIDEBAR } from "~/data";
import styles from "./MenuMobile.module.scss";

const cx = classnames.bind(styles);
function MenuMobile({ setShowMenu }) {
	const currentUser = useSelector((state) => state.users.currentUser);
	const handelClose = () => {
		setShowMenu(false);
	};
	return (
		<div className={cx("wrapper", "grid")}>
			<div className={cx("container")}>
				<div className={cx("header", "row")}>
					<Images
						src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
						alt="Logo"
						className={cx("logo")}
					/>
					<div className={cx("icon_close")}>
						<FontAwesomeIcon
							icon={faTimesCircle}
							onClick={handelClose}
						/>
					</div>
				</div>
				<div className={cx("content")}>
					<ul>
						{LISTSIDEBAR.map((item, index) => {
							return (
								<li key={index}>
									{currentUser && item.to2 ? (
										<Link
											to={item.to2 + currentUser.user_id}
											title={item.title}
											onClick={handelClose}
										>
											{item.title}
										</Link>
									) : (
										<Link
											to={item.to}
											title={item.title}
											onClick={handelClose}
										>
											{item.title}
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default MenuMobile;
