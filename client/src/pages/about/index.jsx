import classnames from "classnames/bind";
import { useEffect } from "react";
import Pages from "~/layout/components/Pages";
import styles from "./About.module.scss";

const cx = classnames.bind(styles);
function About() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	return <Pages title="About"></Pages>;
}

export default About;
