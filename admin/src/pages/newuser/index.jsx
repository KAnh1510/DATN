import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonLoading, Navbar, SideBar, Toastify } from "../../components";
import { user } from "../../createInstance";
import { makeid } from "../../utils";
import "./index.scss";

const NewUser = () => {
	const [file, setFile] = useState("");
	const { isFetching, error } = useSelector((state) => state.users);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [newUser, setNewUser] = useState({
		username: "",
		name: "",
		email: "",
		phone: "",
		password: "",
		address: "",
		country: "",
		isAdmin: true,
	});

	const handleAddUser = async (e) => {
		e.preventDefault();
		await user
			.post("/auth/register", newUser)
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {});
		setOpenSnackbar(true);
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<Navbar />
				<div className="top">
					<h1>Add New User</h1>
				</div>
				<div className="bottom">
					<div className="left">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
							}
							alt=""
						/>
					</div>
					<div className="right">
						<form>
							<div className="formInput">
								<label htmlFor="file">
									Image:
									<DriveFolderUploadOutlinedIcon className="icon" />
								</label>
								<input
									type="file"
									id="file"
									onChange={(e) => setFile(e.target.files[0])}
									style={{ display: "none" }}
									required
								/>
							</div>

							<div className="formInput">
								<label>Username</label>
								<input
									type="text"
									placeholder="john_doe"
									required
									onChange={(e) =>
										setNewUser({
											...newUser,
											username: e.target.value,
										})
									}
								/>
							</div>

							<div className="formInput">
								<label>Name and surname</label>
								<input
									type="text"
									placeholder="John Doe"
									required
									onChange={(e) =>
										setNewUser({
											...newUser,
											name: e.target.value,
										})
									}
								/>
							</div>

							<div className="formInput">
								<label>Email</label>
								<input
									type="text"
									placeholder="mail"
									required
									onChange={(e) =>
										setNewUser({
											...newUser,
											email: e.target.value,
										})
									}
								/>
							</div>

							<div className="formInput">
								<label>Phone</label>
								<input
									type="text"
									placeholder="+1 234 567 89"
									required
									onChange={(e) =>
										setNewUser({
											...newUser,
											phone: e.target.value,
										})
									}
								/>
							</div>

							<div className="formInput">
								<label>Password</label>
								<input
									type="text"
									required
									value={makeid(8)}
									onChange={(e) =>
										setNewUser({
											...newUser,
											password: e.target.value,
										})
									}
								/>
							</div>

							<div className="formInput">
								<label>Address</label>
								<input
									type="text"
									required
									placeholder="Elton St. 216 NewYork"
									onChange={(e) =>
										setNewUser({
											...newUser,
											address: e.target.value,
										})
									}
								/>
							</div>

							<div className="formInput">
								<label>Country</label>
								<input
									type="text"
									required
									placeholder="USA"
									onChange={(e) =>
										setNewUser({
											...newUser,
											country: e.target.value,
										})
									}
								/>
							</div>

							<ButtonLoading
								handleOnclick={handleAddUser}
								isFetching={isFetching}
								action="Edit"
							/>
						</form>

						<Toastify
							openSnackbar={openSnackbar}
							onClose={() => setOpenSnackbar(false)}
							title="Add user"
							error={error}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewUser;
