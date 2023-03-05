import classnames from "classnames/bind";
import styles from "./Captcha.module.scss";

const cx = classnames.bind(styles);

function Captcha() {
	return (
		<div className={cx("capcha")}>
			This site is protected by reCAPTCHA and the Google&nbsp;
			<a
				href="https://policies.google.com/privacy"
				target="_blank"
				rel="noreferrer"
			>
				Privacy Policy
			</a>
			&nbsp;and&nbsp;
			<a
				href="https://policies.google.com/terms"
				target="_blank"
				rel="noreferrer"
			>
				Terms of Service
			</a>
			&nbsp;apply.
		</div>
	);
}

export default Captcha;
