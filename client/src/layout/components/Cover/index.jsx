import classnames from "classnames/bind";
import styles from "./Cover.module.scss";

const cx = classnames.bind(styles);
function Cover() {
	return <div className={cx("cover")}></div>;
}

export default Cover;
