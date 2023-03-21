import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Alert, Skeleton, Snackbar, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedback } from "../../api/feedback";
import { user } from "../../createInstance";
import Layout from "../../layouts";
import "./index.scss";

const SingleFeedback = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { currentFeedback, isFetching } = useSelector(
		(state) => state.feedback
	);
	const [msg, setMsg] = useState("");
	const [isFetchingSend, setFetchingSend] = useState(false);
	const [isOpenSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		getFeedback(dispatch, params.feedbackId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateFeedback = async () => {
		await user
			.put(`/feedback/update/${params.feedbackId}`)
			.then((data) => {})
			.catch((error) => console.log(error));
	};

	const handleReply = async () => {
		setFetchingSend(true);
		await user
			.post("/feedback/reply-email", {
				email: currentFeedback.email,
				msg,
			})
			.then((res) => {
				if (res.status === 200) {
					setMsg(res.data);
					updateFeedback();
					navigate("/feedback");
				} else {
					setMsg("Send email failed!");
				}
				setFetchingSend(false);
			})
			.catch((error) => console.log(error));
		setOpenSnackbar(true);
	};

	return (
		<Layout className="top a-feedback">
			<div className="left">
				<div className="details">
					<div className="details-right">
						<div className="detailItem">
							<span className="itemKey">User Name:</span>
							{isFetching ? (
								<Skeleton
									variant="text"
									width={210}
									height={20}
								/>
							) : (
								<span className="itemValue">
									{currentFeedback.username}
								</span>
							)}
						</div>
						<div className="detailItem">
							<span className="itemKey">Email: </span>
							{isFetching ? (
								<Skeleton
									variant="text"
									width={210}
									height={20}
								/>
							) : (
								<span className="itemValue">
									{currentFeedback.email}
								</span>
							)}
						</div>
						<div className="detailItem">
							<span className="itemKey">Phone: </span>
							{isFetching ? (
								<Skeleton
									variant="text"
									width={210}
									height={20}
								/>
							) : (
								<span className="itemValue">
									{currentFeedback.phoneNumber}
								</span>
							)}
						</div>
						<div className="detailItem content">
							<span className="itemKey">Feedback: </span>
							{isFetching ? (
								<Skeleton
									variant="text"
									width={210}
									height={20}
								/>
							) : (
								<span className="itemValue">
									{currentFeedback.content}
								</span>
							)}
						</div>
					</div>
				</div>
				<div className="action-reply">
					<div className="form-reply">
						<TextareaAutosize
							aria-label="minimum height"
							minRows={4}
							placeholder="Content..."
							style={{
								width: 400,
								padding: 10,
								outline: "none",
								borderColor: "#e0e0e0",
								borderRadius: "4px",
							}}
							onChange={(e) => {
								setMsg(e.target.value);
							}}
						/>
					</div>
					<LoadingButton
						variant="contained"
						color="secondary"
						onClick={handleReply}
						disabled={msg.length === 0}
						loading={isFetchingSend}
						loadingPosition="end"
						endIcon={<SendIcon />}
					>
						<span>Reply!</span>
					</LoadingButton>
				</div>

				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={isOpenSnackbar}
					onClose={() => setOpenSnackbar(false)}
					key="top-right"
					autoHideDuration={6000}
				>
					<Alert
						onClose={() => setOpenSnackbar(false)}
						severity={
							msg !== "Send email failed!" ? "success" : "error"
						}
						sx={{ width: "100%" }}
					>
						{msg}
					</Alert>
				</Snackbar>
			</div>
		</Layout>
	);
};

export default SingleFeedback;
