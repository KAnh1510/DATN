import classnames from "classnames/bind";
import styles from "./HeaderMobile.module.scss";

import { Link } from "react-router-dom";
import Images from "~/components/images";
import User from "~/components/user";

const cx = classnames.bind(styles);
function HeaderMobile() {
	return (
		<div className={cx("grid", "wrapper")}>
			<div className={cx("row", "container")}>
				<div className="col l-0 m-6 c-9">
					<Link to="/">
						<Images
							src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
							alt="Logo"
							className={cx("logo")}
						/>
					</Link>
				</div>
				<div className="col l-0 m-6 c-3">
					<User />
				</div>
			</div>
		</div>
	);
}

export default HeaderMobile;
