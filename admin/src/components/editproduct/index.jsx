import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetColorName } from "hex-color-to-color-name";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../api/productApi";
import ButtonLoading from "../buttonloading";
import Toastify from "../toastify";
import UploadImages from "../uploadimages";
import "./index.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const EditProduct = ({ setCloseEdit }) => {
	const dispatch = useDispatch();
	const { updateSuccess, currentProduct, isFetching } = useSelector(
		(state) => state.products
	);

	const categories = useSelector((state) => state.categories.allCategory);
	const [productUpdate, setProductUpdate] = useState({
		name: currentProduct.name,
		subtle: currentProduct.subtle,
		quality: currentProduct.quality,
		prices: currentProduct.prices,
		categories: currentProduct.categories,
		gallery: currentProduct.gallery,
	});
	const [colorUpdate, setColorUpdate] = useState(currentProduct.color);
	const [sketchColor, setSketchColor] = useState(currentProduct.color[0]);
	const [itemActive, setItemActive] = useState("");
	const newSize = [];
	currentProduct.size.map((item) => newSize.push(item.name));
	const [sizeUpdate, setSizeUpdate] = useState(newSize);
	const [gallery, setGallery] = useState({
		previewImage: "",
		previewVisible: false,
		previewTitle: "",
		fileList: [],
	});
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleShowPicker = (id) => {
		if (itemActive === id) {
			setItemActive(null);
		} else {
			setItemActive(id);
		}
	};

	const handleUpdateProduct = () => {
		const newSize = [];
		const newGallery = [];

		sizeUpdate.map((item) => newSize.push({ name: item }));
		gallery.fileList.forEach((item) => {
			newGallery.push({ src: item.thumbUrl });
		});

		if (newGallery.length !== 0) {
			setProductUpdate({
				...productUpdate,
				color: colorUpdate,
				size: newSize,
				gallery: newGallery,
			});
		} else {
			setProductUpdate({
				...productUpdate,
				color: colorUpdate,
				size: newSize,
			});
		}
		updateProduct(dispatch, currentProduct?._id, productUpdate);
		setOpenSnackbar(true);
	};

	return (
		<div>
			<div className="editButton" onClick={setCloseEdit}>
				Close
			</div>
			<form className="form-edit">
				<div>
					<TextField
						style={{ width: "200px", margin: "5px" }}
						type="text"
						label="Product name"
						value={productUpdate.name}
						onChange={(e) => {
							setProductUpdate({
								...productUpdate,
								name: e.target.value,
							});
						}}
						variant="outlined"
					/>
					<br />
					<TextField
						style={{ width: "200px", margin: "5px" }}
						type="text"
						value={productUpdate.subtle}
						label="Subtle"
						onChange={(e) => {
							setProductUpdate({
								...productUpdate,
								subtle: e.target.value,
							});
						}}
						variant="outlined"
					/>
					<br />
					<TextField
						style={{ width: "200px", margin: "5px" }}
						type="number"
						value={productUpdate.quality}
						label="Quality"
						onChange={(e) => {
							setProductUpdate({
								...productUpdate,
								quality: e.target.value,
							});
						}}
						variant="outlined"
					/>
					<br />
					<FormControl
						sx={{ m: 1, minWidth: 120, height: 56 }}
						style={{ margin: "5px" }}
					>
						<InputLabel id="demo-select-small">Category</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={productUpdate.categories}
							label="Category"
							onChange={(e) => {
								setProductUpdate({
									...productUpdate,
									categories: e.target.value,
								});
							}}
						>
							{categories.map((item) => (
								<MenuItem
									value={item.name.toLowerCase()}
									key={item._id}
								>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<br />
				</div>
				<div>
					<TextField
						style={{ width: "200px", margin: "5px" }}
						type="number"
						value={currentProduct.prices}
						label="Prices"
						onChange={(event) => {
							setProductUpdate({
								...productUpdate,
								prices: event.target.value,
							});
						}}
						variant="outlined"
					/>
					<br />
					<FormControl
						sx={{ m: 1, minWidth: 120, height: 56 }}
						style={{ margin: "5px" }}
					>
						<InputLabel id="demo-select-small">Size</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							multiple
							value={sizeUpdate}
							input={<OutlinedInput label="Size" />}
							MenuProps={MenuProps}
							onChange={(e) => {
								setSizeUpdate(e.target.value);
							}}
						>
							<MenuItem value="S">S</MenuItem>
							<MenuItem value="M">M</MenuItem>
							<MenuItem value="L">L</MenuItem>
						</Select>
					</FormControl>
					<br />
					<div className="color">
						<div className="color-label">Color: </div>
						{colorUpdate?.map((item) => (
							<div key={item._id}>
								<div className="sketchpicker">
									<span
										className="color-item"
										style={{
											backgroundColor: item.idColor,
										}}
										onClick={() =>
											handleShowPicker(item._id)
										}
									></span>
								</div>
								{item._id === itemActive ? (
									<SketchPicker
										color={sketchColor}
										onChange={(e) => {
											setSketchColor(e.hex);
											let newArray = [...colorUpdate];
											const index =
												colorUpdate.indexOf(item);
											newArray[index] = {
												...newArray[index],
												idColor: sketchColor,
												nameColor:
													GetColorName(sketchColor),
											};
											setColorUpdate(newArray);
										}}
									/>
								) : (
									<></>
								)}
							</div>
						))}
					</div>
					<UploadImages gallery={gallery} setGallery={setGallery} />
				</div>
			</form>

			{!isFetching ? (
				<Toastify
					openSnackbar={openSnackbar}
					onClose={() => setOpenSnackbar(false)}
					error={!updateSuccess}
					title="Update Product"
				/>
			) : (
				<></>
			)}

			<ButtonLoading
				handleOnclick={handleUpdateProduct}
				isFetching={isFetching}
				action="Save"
			/>
		</div>
	);
};

export default EditProduct;
