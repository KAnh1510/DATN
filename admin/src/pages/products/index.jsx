/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategory } from "../../api/categoryApi";
import { deleteProduct, getAllProducts } from "../../api/productApi";
import images from "../../assets/images";
import { CustomPagination, Search, StyledDataGrid } from "../../components";
import Layout from "../../layouts";
import "../../scss/style.scss";
import { VndFormat } from "../../utils";
import "./index.scss";

const Products = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { allProduct, isFetching, msgDelete } = useSelector(
		(state) => state.products
	);
	const categories = useSelector((state) => state.categories.allCategory);
	const [filterOption, setFilterOption] = useState("all");

	const handleView = (productId) => {
		navigate(`${productId}`);
	};

	const handleDelete = (productId) => {
		deleteProduct(dispatch, productId);
		getAllProducts(dispatch, "all");
	};

	const handleChange = (event) => {
		setFilterOption(event.target.value);
	};

	useEffect(() => {
		getAllCategory(dispatch);
	}, []);

	useEffect(() => {
		getAllProducts(dispatch, filterOption);
	}, [filterOption, msgDelete]);

	const productColumns = [
		{
			field: "name",
			headerName: "Name",
			width: 300,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={280} height={14} />
						) : (
							params.row.name
						)}
					</div>
				);
			},
		},
		{
			field: "quality",
			headerName: "Quality",
			width: 100,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={80} height={14} />
						) : params.row.quality === 0 ? (
							<span style={{ color: "red" }}>Sold out</span>
						) : (
							params.row.quality
						)}
					</div>
				);
			},
		},
		{
			field: "categories",
			headerName: "Category",
			width: 120,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={100} height={14} />
						) : (
							params.row.categories
						)}
					</div>
				);
			},
		},
		{
			field: "prices",
			headerName: "Prices",
			width: 120,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={100} height={14} />
						) : (
							VndFormat(params.row.prices)
						)}
					</div>
				);
			},
		},
		{
			field: "imgFront",
			headerName: "Image",
			width: 180,
			renderCell: (params) => {
				return isFetching ? (
					<Skeleton variant="text" width={180} height={14} />
				) : (
					<div className="img-product">
						<img
							src={
								params.row.gallery[0]?.src ??
								images.noImageProduct
							}
							alt=""
						/>
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				if (isFetching) {
					return <Skeleton variant="text" width={130} height={14} />;
				}
				if (params.row.deleted) {
					return (
						<div
							className="deleteButton"
							style={{
								backgroundColor: "gray",
								padding: 4,
								borderRadius: 4,
							}}
						>
							Delete
						</div>
					);
				}
				return (
					<div className="cellAction">
						<div onClick={() => handleView(params.row._id)}>
							<div className="viewButton">View</div>
						</div>
						<div
							className="deleteButton"
							onClick={() => handleDelete(params.row._id)}
						>
							Delete
						</div>
					</div>
				);
			},
		},
	];

	return (
		<Layout className="product">
			<div className="datatable">
				<div className="datatableTitle">
					<Search />
					<div className="button-right">
						<Link to={"/products/new"} className="link">
							Add New
						</Link>
						<select
							onChange={(event) => handleChange(event)}
							style={{ width: "200px" }}
							className="form-select"
						>
							<option value="all">All</option>
							{categories.map((item) => (
								<option value={item.name} key={item._id}>
									{item.name}
								</option>
							))}
						</select>
					</div>
				</div>

				<StyledDataGrid
					className="datagrid"
					rows={allProduct ?? []}
					columns={productColumns}
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

export default Products;
