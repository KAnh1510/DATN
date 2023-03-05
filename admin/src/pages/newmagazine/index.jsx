import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMagazine } from "../../api/magazineApi";
import { ButtonLoading, Toastify, UploadImages } from "../../components";
import Layout from "../../layouts";

const NewMagazine = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [required, setRequired] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [newMagazine, setNewMagazine] = useState({
		title: "",
		writer: "",
		gallery: [],
	});
	const { isFetching, error } = useSelector((state) => state.magazine);
	const [gallery, setGallery] = useState({
		previewImage: "",
		previewVisible: false,
		previewTitle: "",
		fileList: [],
	});

	const handleAddMagazine = (e) => {
		e.preventDefault();
		const newGallery = [];
		gallery.fileList.forEach((item) => {
			newGallery.push({ src: item.thumbUrl });
		});

		if (newMagazine.title === "" || newMagazine.writer === "") {
			setRequired(true);
		} else {
			createMagazine(dispatch, navigate, {
				...newMagazine,
				gallery: newGallery,
			});
		}
	};

	return (
		<Layout className="new-item">
			<div className="top">
				<h1>Add New Magazine</h1>
			</div>
			<div className="bottom">
				<form
					className="form-edit"
					style={{ justifyContent: "inherit", gap: 30 }}
				>
					<div>
						<TextField
							style={{ width: "200px", margin: "5px" }}
							type="text"
							label="Title"
							error={required}
							value={newMagazine?.title}
							required
							onChange={(e) => {
								setNewMagazine({
									...newMagazine,
									title: e.target.value,
								});
							}}
							variant="outlined"
						/>
						<br />
						<TextField
							style={{ width: "200px", margin: "5px" }}
							type="text"
							value={newMagazine?.writer}
							label="Writer"
							required
							onChange={(e) => {
								setNewMagazine({
									...newMagazine,
									writer: e.target.value,
								});
							}}
							variant="outlined"
						/>
					</div>
					<div>
						<UploadImages
							gallery={gallery}
							setGallery={setGallery}
						/>
					</div>
				</form>
				<Toastify
					openSnackbar={openSnackbar}
					onClose={() => setOpenSnackbar(false)}
					error={error}
					title="Add Magazine"
				/>
				<ButtonLoading
					handleOnclick={handleAddMagazine}
					isFetching={isFetching}
					action="Add"
				/>
			</div>
		</Layout>
	);
};

export default NewMagazine;
