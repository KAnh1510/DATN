import {
	faFacebookF,
	faInstagram,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./NewFooter.module.scss";

const cx = classnames.bind(styles);

function NewFooter() {
	return (
		<div className={cx("footer", "grid")}>
			<div className={cx("wrapper", "row")}>
				<p className={cx("copy-right", "col c-6")}>
					Copyright COLKIDS.CLUB ®
				</p>
				<Link to="/" className={cx("logo", "col c-0")}>
					<img
						src="https://file.hstatic.net/200000436739/file/logo-01-01_09ce146264e44644ba139b66098f2e6c.png"
						alt="logo"
					/>
				</Link>
				<ul className={cx("social", "col c-2")}>
					<li>
						<a href="https://www.facebook.com">
							<FontAwesomeIcon icon={faFacebookF} />
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com">
							<FontAwesomeIcon icon={faInstagram} />
						</a>
					</li>
					<li>
						<a href="https://www.youtube.com">
							<FontAwesomeIcon icon={faYoutube} />
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default NewFooter;
