/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Box, Fade, Link, Popper } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllFeedback } from "../../api/feedback";
import { NotificationsIcon } from "../../assets/icon";
import { user } from "../../createInstance";
import { formatTime } from "../../utils";
import "./index.scss";

const Notify = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const feedback = useSelector((state) => state.feedback.allFeedback);
	const [totalFeedback, setTotalFeedback] = useState(0);
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState();
	const darkMode = useSelector((state) => state.darkMode.darkMode);

	const handleOpenFeedback = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const canBeOpen = open && Boolean(anchorEl);
	const id = canBeOpen ? "spring-popper" : undefined;

	const getTotalFeedback = async () => {
		await user
			.get("/feedback/total-feedback")
			.then((response) => setTotalFeedback(response.data));
	};

	useEffect(() => {
		getTotalFeedback();
		getAllFeedback(dispatch);
	}, []);

	const handleFeedback = (id) => {
		navigate(`/feedback/${id}`);
	};
	return (
		<div className="item" onClick={handleOpenFeedback}>
			<Badge color="error" badgeContent={totalFeedback} max={99}>
				<NotificationsIcon className="icon" />
			</Badge>
			<Popper id={id} open={open} anchorEl={anchorEl} transition>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps}>
						<Box
							sx={{
								border: 1,
								p: 1,
								bgcolor: "background.paper",
							}}
							className={
								darkMode ? "notify-box dark" : "notify-box"
							}
						>
							<ul className="notify-list">
								{feedback.map((item) => (
									<div
										key={item._id}
										onClick={() => {
											!item.status &&
												handleFeedback(item._id);
										}}
										className={
											item.status
												? "notify-item"
												: "notify-item-active"
										}
									>
										<li>
											<div
												className={
													item.status
														? "text-pop"
														: "text-pop-active"
												}
											>
												<div>{item.username}</div>
												<div className="">
													{formatTime(item.createdAt)}
												</div>
											</div>
											<div className="content">
												{item.content}
											</div>
										</li>
									</div>
								))}
								<li
									style={{
										textAlign: "center",
										padding: "8px",
									}}
								>
									<Link
										component="button"
										variant="body2"
										onClick={() => {
											navigate("/feedback");
										}}
									>
										See more
									</Link>
								</li>
							</ul>
						</Box>
					</Fade>
				)}
			</Popper>
		</div>
	);
};

export default Notify;
