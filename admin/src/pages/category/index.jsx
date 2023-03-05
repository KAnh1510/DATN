/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Skeleton, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory, getAllCategory } from "../../api/categoryApi";
import { getAllProducts } from "../../api/productApi";
import { CustomPagination, StyledDataGrid } from "../../components";
import Layout from "../../layouts";

const Categories = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const { allCategory, isFetching, msg } = useSelector(
		(state) => state.categories
	);
	const products = useSelector((state) => state.products.allProduct);

	const handleView = (id) => {
		navigate(`${id}`);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const handleDelete = (name, id) => {
		let quantity = 0;
		products.forEach((product) => {
			if (product.categories === name.toLowerCase()) {
				quantity++;
			}
		});

		if (quantity === 0) {
			deleteCategory(dispatch, id);
		} else {
			setOpen(true);
		}
	};

	useEffect(() => {
		getAllCategory(dispatch);
		getAllProducts(dispatch, "all");
	}, [msg]);

	const categoryColumns = [
		{
			field: "name",
			headerName: "Name",
			width: 200,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={180} height={14} />
						) : (
							params.row.name
						)}
					</div>
				);
			},
		},
		{
			field: "quantity",
			headerName: "Quantity",
			width: 200,
			renderCell: (params) => {
				let quantity = 0;
				products.forEach((product) => {
					if (product.categories === params.row.name.toLowerCase()) {
						quantity++;
					}
				});
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={180} height={14} />
						) : (
							quantity
						)}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<>
						{isFetching ? (
							<Skeleton variant="text" width={180} height={14} />
						) : (
							<div className="cellAction">
								<div onClick={() => handleView(params.row._id)}>
									<div className="viewButton">View</div>
								</div>

								<div
									className="deleteButton"
									onClick={() =>
										handleDelete(
											params.row.name,
											params.row._id
										)
									}
								>
									Delete
								</div>
							</div>
						)}
					</>
				);
			},
		},
	];

	return (
		<Layout>
			<div className="datatable">
				<div className="datatableTitle">
					<div className="button-right">
						<Link to={"/categories/new"} className="link">
							Add New
						</Link>
					</div>
				</div>

				<Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
				>
					<Alert
						onClose={handleClose}
						severity="error"
						sx={{ width: "100%" }}
					>
						Categories containing products, not deleted!
					</Alert>
				</Snackbar>

				<StyledDataGrid
					className="datagrid"
					rows={allCategory ?? []}
					columns={categoryColumns ?? []}
					pageSize={9}
					rowsPerPageOptions={[9]}
					components={{
						Pagination: CustomPagination,
					}}
					getRowId={(row) => row._id}
				/>
			</div>
		</Layout>
	);
};

export default Categories;
