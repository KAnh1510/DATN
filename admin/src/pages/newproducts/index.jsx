import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productApi";
import { ButtonLoading, Toastify, UploadImages } from "../../components";
import Layout from "../../layouts";
import "../../scss/style.scss";

const NewProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const categories = useSelector((state) => state.categories.allCategory);
	const [newProduct, setNewProduct] = useState({
		name: "",
		subtle: "",
		quality: 1,
		prices: 0,
		categories: "",
		size: [],
		color: [],
		gallery: [],
	});
	const [sketchColor, setSketchColor] = useState("#0000FF");
	const [gallery, setGallery] = useState({
		previewImage: "",
		previewVisible: false,
		previewTitle: "",
		fileList: [],
	});
	const [showPicker, setShowPicker] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const error = useSelector((state) => state.products.error);
	const isFetching = useSelector((state) => state.products.isFetching);

	const handleAddProduct = () => {
		const newSize = [];
		const newGallery = [];

		newProduct.size.forEach((item) => newSize.push({ name: item }));
		gallery.fileList.forEach((item) => {
			newGallery.push({ src: item.thumbUrl });
		});

		createProduct(dispatch, navigate, {
			...newProduct,
			size: newSize,
			gallery: newGallery,
		});
		setOpenSnackbar(true);
	};

	return (
		<Layout className="new-item">
			<div className="top">
				<h1>Add New Product</h1>
			</div>
			<div className="bottom">
				<form className="form-edit">
					<div>
						<TextField
							style={{ width: "200px", margin: "5px" }}
							type="text"
							label="Product name"
							required
							value={newProduct.name}
							onChange={(e) => {
								setNewProduct({
									...newProduct,
									name: e.target.value,
								});
							}}
							variant="outlined"
						/>
						<br />
						<TextField
							style={{ width: "200px", margin: "5px" }}
							type="text"
							required
							value={newProduct.subtle}
							label="Subtle"
							onChange={(e) => {
								setNewProduct({
									...newProduct,
									subtle: e.target.value,
								});
							}}
							variant="outlined"
						/>
						<br />
						<TextField
							style={{ width: "200px", margin: "5px" }}
							type="number"
							required
							value={newProduct.quality}
							label="Quality"
							onChange={(e) => {
								setNewProduct({
									...newProduct,
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
							<InputLabel id="demo-select-small">
								Category
							</InputLabel>
							<Select
								labelId="categories"
								id="categories"
								value={newProduct.categories}
								label="Category"
								onChange={(e) => {
									setNewProduct({
										...newProduct,
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
							value={newProduct.prices}
							label="Prices"
							required
							onChange={(event) => {
								setNewProduct({
									...newProduct,
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
								value={newProduct.size}
								input={<OutlinedInput label="Size" />}
								onChange={(e) => {
									setNewProduct({
										...newProduct,
										size: e.target.value,
									});
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
							<div className="sketchpicker">
								<span
									className="color-item"
									style={{
										backgroundColor: sketchColor,
									}}
									onClick={() => setShowPicker(!showPicker)}
								></span>
							</div>
							{showPicker && (
								<SketchPicker
									color={sketchColor}
									onChange={(e) => {
										setSketchColor(e.hex);
										setNewProduct({
											...newProduct,
											color: [
												{
													idColor: sketchColor,
													nameColor:
														GetColorName(
															sketchColor
														),
												},
											],
										});
									}}
								/>
							)}
						</div>
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
					title="Add Product"
				/>
				<ButtonLoading
					handleOnclick={handleAddProduct}
					isFetching={isFetching}
					action="Add"
				/>
			</div>
		</Layout>
	);
};

export default NewProduct;
