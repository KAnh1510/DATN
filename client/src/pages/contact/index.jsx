import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createFeedback } from "~/api/feedbackApi";
import Button from "~/components/button";
import Captcha from "~/components/captcha";
import styles from "./Contact.module.scss";

const cx = classnames.bind(styles);

function Contact() {
	const dispatch = useDispatch();
	const [mess, setMess] = useState(false);
	const [values, setValues] = useState({
		username: "",
		email: "",
		phoneNumber: "",
		content: "",
		status: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			values.username.length !== 0 ||
			values.email.length !== 0 ||
			values.phoneNumber.length !== 0 ||
			values.content.length !== 0
		) {
			createFeedback(dispatch, values);
			setMess(true);
		}
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className={cx("contact row")}>
			<div className={cx("col l-0 m-1 c-0")}></div>
			<div className={cx("col l-6 m-10 c-12")}>
				<div className={cx("map")}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1573078126626!2d106.67907471526028!3d10.799261261723691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d73bb2a5bf%3A0xa2ed9e05de7427af!2zMTAsIDQgxJBvw6BuIFRo4buLIMSQaeG7g20sIFBoxrDhu51uZyAxLCBQaMO6IE5odeG6rW4sIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1667549637375!5m2!1svi!2sus"
						allowFullScreen=""
						loading="lazy"
						title="Map"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
			<div className={cx("col l-6 m-12 c-12")}>
				<div className={cx("info")}>
					<h1 className={cx("header")}>Contact</h1>
					<div className={cx("box-contact")}>
						<ul className={cx("address")}>
							<li>
								<p>Our Address</p>
								<p>
									<strong>
										10/4 Đoàn Thị Điểm, phường 1, quận Phú
										Nhuận, TP. Hồ Chí Minh
									</strong>
								</p>
							</li>
							<li>
								<p>Our Email</p>
								<p>
									<strong>
										colkidsclubcontact@gmail.com
									</strong>
								</p>
							</li>
							<li>
								<p>Phone</p>
								<p>
									<strong>1900633549</strong>
								</p>
							</li>
							<li>
								<p>Working time</p>
								<p>
									<strong>09:00 - 21:00</strong>
								</p>
							</li>
						</ul>
					</div>
					<h2 className={cx("title")}>Send us your question</h2>
					<div className={cx("contact-form")}>
						<div className={cx("row")}>
							<form>
								<div className={cx("col l-12 m-12 c-12")}>
									<div className={cx("input-group")}>
										<input
											type="text"
											required
											name="name"
											placeholder="Your name"
											value={values.username}
											onChange={(e) =>
												setValues({
													...values,
													username: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className={cx("col l-12 m-12 c-12")}>
									<div className={cx("input-group")}>
										<input
											type="text"
											required
											name="email"
											placeholder="Email"
											value={values.email}
											onChange={(e) =>
												setValues({
													...values,
													email: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className={cx("col l-12 m-12 c-12")}>
									<div className={cx("input-group")}>
										<input
											type="text"
											required
											name="phone"
											placeholder="Phone number"
											value={values.phoneNumber}
											onChange={(e) =>
												setValues({
													...values,
													phoneNumber: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className={cx("col l-12 m-12 c-12")}>
									<div className={cx("input-group")}>
										<textarea
											type="text"
											required
											name="content"
											placeholder="Question..."
											value={values.content}
											onChange={(e) =>
												setValues({
													...values,
													content: e.target.value,
												})
											}
										/>
										<Captcha />
									</div>
								</div>

								{mess ? (
									<div
										style={{
											padding: "10px 12px",
											color: "blue",
										}}
									>
										You have sent us feedback! We will pay
										you back as soon as possible ^^
									</div>
								) : (
									<></>
								)}

								<div className={cx("col l-12 c-12")}>
									<Button onClick={(e) => handleSubmit(e)}>
										Send us
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
