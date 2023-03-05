import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import React from "react";
import { getBase64 } from "../../utils";

const UploadImages = ({ gallery, setGallery }) => {
	const handleCancel = () =>
		setGallery({ ...gallery, previewVisible: false });

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
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
	return (
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
	);
};

export default UploadImages;
