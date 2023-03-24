/* eslint-disable react-hooks/exhaustive-deps */
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Skeleton } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeStatusOrder, getAllOrder } from "../../api/orderApi";
import { CustomPagination, StyledDataGrid } from "../../components";
import { user } from "../../createInstance";
import Layout from "../../layouts";
import { formatDateTime, VndFormat } from "../../utils";
import "./index.scss";

const Orders = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { msg, allOrder, isFetching } = useSelector((state) => state.orders);
	const [filterOption, setFilterOption] = useState("all");

	const handleView = (id) => {
		navigate(`${id}`);
	};

	const handleDelete = (id) => {
		const order = allOrder.find((item) => item._id === id);
		const { _id: _, ...newObj } = order;
		changeStatusOrder(dispatch, id, { newObj, status: 3 });
	};

	const handleShipping = (id) => {
		const order = allOrder.find((item) => item._id === id);
		const { _id: _, ...newObj } = order;
		changeStatusOrder(dispatch, id, { newObj, status: 2 });
	};

	const handleCompleted = (id) => {
		const order = allOrder.find((item) => item._id === id);
		const { _id: _, ...newObj } = order;
		changeStatusOrder(dispatch, id, { newObj, status: 4 });
		const res = user.post("/products/update-quantity", order.products);
		console.log(res);
	};

	const handleChange = (event) => {
		setFilterOption(event.target.value);
	};

	useEffect(() => {
		getAllOrder(dispatch, filterOption);
	}, [filterOption, msg]);

	const orderColumns = [
		{
			field: "date",
			headerName: "Date",
			width: 150,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={130} height={14} />
						) : (
							formatDateTime(params.row.createdAt)
						)}
					</div>
				);
			},
		},
		{
			field: "username",
			headerName: "Name",
			width: 150,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={130} height={14} />
						) : (
							params.row.username
						)}
					</div>
				);
			},
		},
		{
			field: "address",
			headerName: "Ship To",
			width: 230,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={210} height={14} />
						) : (
							params.row.address
						)}
					</div>
				);
			},
		},
		{
			field: "paymentOption",
			headerName: "Payment Method",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						{isFetching ? (
							<Skeleton variant="text" width={130} height={14} />
						) : (
							<div>
								{params.row.paymentOption === 1 && (
									<span>Cash on Delivery</span>
								)}
								{params.row.paymentOption === 2 && (
									<span>Online</span>
								)}
							</div>
						)}
					</>
				);
			},
		},
		{
			field: "amount",
			headerName: "Sale Amount",
			width: 110,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={90} height={14} />
						) : (
							VndFormat(params.row.amount)
						)}
					</div>
				);
			},
		},
		{
			field: "status",
			headerName: "Status",
			width: 110,
			renderCell: (params) => {
				return (
					<>
						{isFetching ? (
							<Skeleton variant="text" width={90} height={14} />
						) : (
							<div>
								{params.row.status === 1 && (
									<span className="pending">Pending</span>
								)}
								{params.row.status === 2 && (
									<span className="delivery">Delivery</span>
								)}
								{params.row.status === 3 && (
									<span className="cancel">Cancel</span>
								)}
								{params.row.status === 4 && (
									<span className="complete">Completed</span>
								)}
							</div>
						)}
					</>
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
							<Skeleton variant="text" width={130} height={14} />
						) : (
							<div className="cellAction">
								<div
									onClick={() => handleView(params.row._id)}
									className="button view-btn"
									title="view"
								>
									<RemoveRedEyeIcon />
								</div>
								{params.row.status === 2 ? (
									<div
										className="button done-btn"
										onClick={() =>
											handleCompleted(params.row._id)
										}
										title="completed"
									>
										<CheckCircleIcon />
									</div>
								) : (
									params.row.status !== 1 ||
									(params.row.status !== 3 && (
										<>
											<div
												className="button delete-btn"
												onClick={() =>
													handleDelete(params.row._id)
												}
												title="cancel"
											>
												<DeleteIcon />
											</div>

											<div
												className="button shipping-btn"
												onClick={() =>
													handleShipping(
														params.row._id
													)
												}
												title="delivery"
											>
												<LocalShippingIcon />
											</div>

											<div
												className="button done-btn"
												onClick={() =>
													handleCompleted(
														params.row._id
													)
												}
												title="completed"
											>
												<CheckCircleIcon />
											</div>
										</>
									))
								)}
							</div>
						)}
					</>
				);
			},
		},
	];

	return (
		<Layout>
			<div className="table-orders datatable">
				<div className="datatableTitle">
					<div
						className="button-right"
						style={{ justifyContent: "end", width: "100%" }}
					>
						<select
							onChange={(event) => handleChange(event)}
							style={{ width: "200px" }}
							className="form-select"
						>
							<option value="all">All</option>
							<option value="pending">Pending</option>
							<option value="delivery">Delivery</option>
							<option value="cancel">Cancel</option>
							<option value="completed">Complete</option>
						</select>
					</div>
				</div>

				<StyledDataGrid
					className="datagrid"
					rows={allOrder ?? []}
					columns={orderColumns}
					pageSize={14}
					rowsPerPageOptions={[14]}
					components={{
						Pagination: CustomPagination,
					}}
					getRowId={(row) => row._id}
				/>
			</div>
		</Layout>
	);
};

export default Orders;
