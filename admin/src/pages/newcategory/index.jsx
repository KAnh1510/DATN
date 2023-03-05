import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../api/categoryApi";
import { ButtonLoading, Toastify } from "../../components";
import Layout from "../../layouts";

const NewCategory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [newCate, setNewCate] = useState({ name: "" });
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const { error, isFetching } = useSelector((state) => state.categories);

	const handleAddCategory = () => {
		createCategory(dispatch, navigate, newCate);
	};

	return (
		<Layout className="new-item">
			<div className="top">
				<h1>Add New Category</h1>
			</div>
			<div className="bottom">
				<form className="form-edit">
					<div>
						<TextField
							style={{ width: "200px", margin: "5px" }}
							type="text"
							label="Category name"
							variant="outlined"
							onChange={(e) =>
								setNewCate({
									...newCate,
									name: e.target.value,
								})
							}
						/>
						<br />
					</div>

					<ButtonLoading
						handleOnclick={handleAddCategory}
						isFetching={isFetching}
						action="Send"
					/>
				</form>
				<Toastify
					openSnackbar={openSnackbar}
					onClose={() => setOpenSnackbar(false)}
					title="Add Category"
					error={error}
				/>
			</div>
		</Layout>
	);
};

export default NewCategory;
