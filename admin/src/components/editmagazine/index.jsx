import { PlusOutlined } from "@ant-design/icons";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar, TextField } from "@mui/material";
import { Modal, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMagazine } from "../../api/magazineApi";

const EditMagazine = ({ setCloseEdit }) => {
	const dispatch = useDispatch();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const { currentMagazine, isFetching, error } = useSelector(
		(state) => state.magazine
	);
	const [newMagazine, setNewMagazine] = useState({
		title: currentMagazine?.title,
		writer: currentMagazine?.writer,
		gallery: currentMagazine?.gallery,
	});
	const [gallery, setGallery] = useState({
		previewImage: "",
		previewVisible: false,
		previewTitle: "",
		fileList: [],
	});

	const handleCancel = () =>
		setGallery({ ...gallery, previewVisible: false });

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = URL.createObjectURL(file.originFileObj);
		}
		setGallery({
			...gallery,
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle:
				file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
		});
	};

	const handleChange = ({ fileList }) => {
		setGallery({
			...gallery,
			fileList: fileList,
		});
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleUpdateMagazine = async () => {
		const newGallery = [];
		gallery.fileList.forEach((item) => {
			newGallery.push({ file: item.thumbUrl });
		});
		if (newGallery.length !== 0) {
			setNewMagazine({ ...newMagazine, gallery: newGallery });
		}
		updateMagazine(dispatch, currentMagazine._id, newMagazine);
		setOpenSnackbar(true);
	};

	return (
		<div>
			<div className="editButton" onClick={setCloseEdit}>
				Close
			</div>
			<form
				className="form-edit"
				style={{ justifyContent: "inherit", gap: 30 }}
			>
				<div>
					<TextField
						style={{ width: "200px", margin: "5px" }}
						type="text"
						label="Title"
						value={newMagazine?.title}
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
					<div className="gallery">
						<div className="gallery-label">Gallery: </div>
						<Upload
							listType="picture-card"
							fileList={gallery.fileList}
							onPreview={handlePreview}
							onChange={handleChange}
							beforeUpload={() => false}
						>
							{gallery.fileList.length >= 8 ? null : uploadButton}
						</Upload>
						<Modal
							open={gallery.previewVisible}
							title={gallery.previewTitle}
							footer={null}
							onCancel={handleCancel}
						>
							<img
								alt="example"
								style={{ width: "100%" }}
								src={gallery.previewImage}
							/>
						</Modal>
					</div>
				</div>
			</form>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={openSnackbar}
				onClose={() => setOpenSnackbar(false)}
				key="top-right"
				autoHideDuration={6000}
			>
				<Alert
					onClose={() => setOpenSnackbar(false)}
					severity={!error ? "success" : "error"}
					sx={{ width: "100%" }}
				>
					{!error
						? "Update Magazine Successfully!"
						: "Update Magazine Failed!"}
				</Alert>
			</Snackbar>

			<div className="update-btn">
				<LoadingButton
					color="secondary"
					onClick={handleUpdateMagazine}
					loading={isFetching}
					loadingPosition="start"
					startIcon={<SaveIcon />}
					variant="contained"
				>
					<span>Save</span>
				</LoadingButton>
			</div>
		</div>
	);
};

export default EditMagazine;
