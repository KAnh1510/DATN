import { Skeleton } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser } from "../../api/userApi";
import images from "../../assets/images/";
import { CustomPagination, StyledDataGrid } from "../../components";
import Layout from "../../layouts";

const Customers = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [filterOption, setFilterOption] = useState("0");
	const users = useSelector((state) => state.users.allUser);
	const isFetching = useSelector((state) => state.users.isFetching);

	const handleView = (id) => {
		navigate(`${id}`);
	};

	const handleDelete = () => {};

	const handleChange = (event) => {
		setFilterOption(event.target.value);
	};

	const userColumns = [
		{
			field: "username",
			headerName: "User",
			width: 210,
			renderCell: (params) => {
				return (
					<>
						{isFetching ? (
							<Skeleton variant="text" width={280} height={14} />
						) : (
							<div className="cellWithImg">
								<img
									className="cellImg"
									src={
										params.row?.avatar ?? images.noImageUser
									}
									alt="avatar"
								/>
								{params.row.username}
							</div>
						)}
					</>
				);
			},
		},
		{
			field: "email",
			headerName: "Email",
			width: 250,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={210} height={14} />
						) : (
							params.row.email
						)}
					</div>
				);
			},
		},
		{
			field: "isAdmin",
			headerName: "Role",
			width: 100,
			renderCell: (params) => {
				return (
					<>
						{isFetching ? (
							<Skeleton variant="text" width={210} height={14} />
						) : (
							<div>
								{params.row.isAdmin ? "Admin" : "Customer"}
							</div>
						)}
					</>
				);
			},
		},
		{
			field: "address",
			headerName: "Address",
			width: 200,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={180} height={14} />
						) : (
							params.row.address
						)}
					</div>
				);
			},
		},
		{
			field: "phoneNumber",
			headerName: "PhoneNumber",
			width: 150,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={100} height={14} />
						) : (
							params.row.phoneNumber
						)}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return isFetching ? (
					<Skeleton variant="text" width={130} height={14} />
				) : (
					<div className="cellAction">
						<div onClick={() => handleView(params.row._id)}>
							<div className="viewButton">View</div>
						</div>
						{params.row.isAdmin ? (
							<></>
						) : (
							<div
								className="deleteButton"
								onClick={() => handleDelete(params.row._id)}
							>
								Delete
							</div>
						)}
					</div>
				);
			},
		},
	];

	useEffect(() => {
		getAllUser(dispatch, filterOption);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterOption]);

	return (
		<Layout>
			<div className="datatable">
				<div className="datatableTitle">
					<div className="button-right">
						<Link to={"/users/new"} className="link">
							Add New
						</Link>
						<select
							onChange={(event) => handleChange(event)}
							style={{ width: "200px" }}
							className="form-select"
						>
							<option value="0">All</option>
							<option value="1">Admin</option>
							<option value="2">Customers</option>
						</select>
					</div>
				</div>

				<StyledDataGrid
					className="datagrid"
					rows={users ?? []}
					columns={userColumns}
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

export default Customers;
