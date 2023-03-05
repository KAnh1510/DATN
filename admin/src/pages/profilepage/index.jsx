import { PhotoCamera } from "@mui/icons-material";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	FormControl,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/userApi";
import images from "../../assets/images";
import { ButtonLoading, Toastify } from "../../components";
import Layout from "../../layouts";
import "./index.scss";

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.users.currentUser);

	const [file, setFile] = useState(currentUser?.avatar);
	const [userUpdate, setUserUpdate] = useState({
		username: currentUser?.username,
		email: currentUser?.email,
		address: currentUser?.address,
		phoneNumber: currentUser?.phoneNumber,
		avatar: currentUser?.avatar,
	});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const updateFailed = useSelector((state) => state.users.msg);
	const isFetching = useSelector((state) => state.products.isFetching);

	const handleUpdateUser = () => {
		updateUser(dispatch, currentUser._id, {
			...userUpdate,
			avatar: file ?? images.noImageUser,
		});
		setOpenSnackbar(true);
	};

	return (
		<Layout className="profile">
			<div className="profile-title">Profile</div>
			<div className="profile-info">
				<div className="profile-info-left">
					<Card
						sx={{ maxWidth: 345, padding: "10px" }}
						className="profile-card"
					>
						<CardMedia
							sx={{
								height: 140,
								width: 140,
								borderRadius: "50%",
								margin: "auto",
								border: "1px solid #e0e0e0",
							}}
							image={file ?? images.noImageUser}
							title="green iguana"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								sx={{ textAlign: "center" }}
							>
								{userUpdate.username ?? "-"}
							</Typography>
							<Typography variant="body2" component="div">
								{userUpdate.email ?? "-"}
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "center" }}>
							<form>
								<div className="formInput">
									<label htmlFor="file">
										<PhotoCamera
											sx={{
												color: "purple",
												cursor: "pointer",
											}}
										/>
									</label>
									<input
										type="file"
										id="file"
										onChange={(e) => {
											setFile(
												URL.createObjectURL(
													e.target.files[0]
												)
											);
										}}
										style={{ display: "none" }}
									/>
								</div>
							</form>
						</CardActions>
					</Card>
				</div>
				<div className="profile-info-right">
					<div
						className="editButton"
						onClick={() => navigate("change-password")}
					>
						Change password
					</div>
					<Card
						sx={{ maxWidth: 345, padding: "10px" }}
						className="profile-card"
					>
						<CardContent>
							<FormControl>
								<TextField
									style={{ width: "350px", margin: "5px" }}
									type="text"
									label="User name"
									value={userUpdate.username}
									onChange={(event) =>
										setUserUpdate({
											...userUpdate,
											name: event.target.value,
										})
									}
									variant="outlined"
								/>
								<br />
								<TextField
									style={{ width: "350px", margin: "5px" }}
									type="text"
									value={userUpdate.email}
									label="Email"
									onChange={(event) =>
										setUserUpdate({
											...userUpdate,
											email: event.target.value,
										})
									}
									variant="outlined"
								/>
								<br />
								<TextField
									style={{ width: "350px", margin: "5px" }}
									type="text"
									value={userUpdate.address}
									label="Address"
									variant="outlined"
									onChange={(event) =>
										setUserUpdate({
											...userUpdate,
											address: event.target.value,
										})
									}
								/>
								<br />
								<TextField
									style={{ width: "350px", margin: "5px" }}
									type="text"
									value={userUpdate.phoneNumber}
									label="Phone"
									variant="outlined"
									onChange={(event) =>
										setUserUpdate({
											...userUpdate,
											phoneNumber: event.target.value,
										})
									}
								/>
							</FormControl>
						</CardContent>
						<CardActions sx={{ justifyContent: "center" }}>
							<ButtonLoading
								handleOnclick={handleUpdateUser}
								action="Update"
								isFetching={isFetching}
							/>
						</CardActions>
					</Card>
				</div>
			</div>

			<Toastify
				openSnackbar={openSnackbar}
				onClose={() => setOpenSnackbar(false)}
				title="Update User"
				error={updateFailed !== ""}
			/>
		</Layout>
	);
};

export default Profile;
