import {
	faLocationDot,
	faPaperPlane,
	faPhoneFlip,
	faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import NewFooter from "../../layout/components/NewFooter";
import styles from "./Footer.module.scss";

const cx = classnames.bind(styles);

function Footer() {
	return (
		<div className="grid">
			<div className={cx("wrapper")}>
				<div className="row">
					<div className="col l-12 m-12 c-12">
						<div className={cx("hot_line")}>
							<FontAwesomeIcon
								icon={faPhoneFlip}
								className={cx("icon")}
							/>
							<p>Hotline</p>
							<p>
								<a href="tel:+84-093-359-8191">
									093 &nbsp;359&nbsp;81&nbsp;91&nbsp;
								</a>
							</p>
						</div>
					</div>
				</div>
				<div className={cx("row", "contact")}>
					<div className="col l-3 m-6 c-12">
						<div className={cx("link")}>
							<h2>Link</h2>
							<p>
								<Link to="/pages/about">About</Link>
							</p>
							<p>
								<Link to="/pages/return-policy">
									Return Policy
								</Link>
							</p>
							<p>
								<Link to="/pages/private-policy">
									Private Policy
								</Link>
							</p>
							<p>
								<Link to="/pages/service">
									Terms of Service
								</Link>
							</p>
							<p>
								<Link to="/pages/contact">Contact</Link>
							</p>
						</div>
					</div>
					<div className="col l-3 m-6 c-12">
						<div className={cx("information")}>
							<h2>Contact Info</h2>
							<p>
								<FontAwesomeIcon icon={faLocationDot} />
								<span>
									10/4 Đoàn Thị Điểm, phường 1, quận Phú
									Nhuận, TP.HCM
								</span>
							</p>
							<p>
								<FontAwesomeIcon icon={faPhoneSquare} />
								<span>093&nbsp;359&nbsp;81&nbsp;91&nbsp;</span>
							</p>
							<p>
								<FontAwesomeIcon icon={faPaperPlane} />
								<span>coldkidclubcontact@gmail.com</span>
							</p>
						</div>
					</div>
					<div className="col l-3 m-5 c-12">
						<div className={cx("fanpage")}>
							<h2>Fanpage</h2>
							<iframe
								title="https://www.facebook.com/colkidsnevadie"
								src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcolkidsnevadie&tabs=timeline&width=350&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
								width="350"
								height="130"
								style={{ border: "none", overflow: "hidden" }}
								allowFullScreen={true}
								allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
							></iframe>
						</div>
					</div>
				</div>
				<NewFooter />
			</div>
		</div>
	);
}

export default Footer;
