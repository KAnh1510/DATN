import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomPagination, StyledDataGrid } from "../../components";
import Layout from "../../layouts";
import { formatDateTime } from "../../utils";
import "./index.scss";

const Feedback = () => {
	const { allFeedback, isFetching } = useSelector((state) => state.feedback);
	const navigate = useNavigate();

	const feedbackColumns = [
		{
			field: "username",
			headerName: "Name",
			width: 180,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={150} height={14} />
						) : (
							params.row.username
						)}
					</div>
				);
			},
		},
		{
			field: "createdAt",
			headerName: "Date",
			width: 180,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={150} height={14} />
						) : (
							formatDateTime(params.row.createdAt)
						)}
					</div>
				);
			},
		},
		{
			field: "phoneNumber",
			headerName: "Phone",
			width: 180,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={150} height={14} />
						) : (
							params.row.phoneNumber
						)}
					</div>
				);
			},
		},
		{
			field: "content",
			headerName: "Content",
			width: 330,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={230} height={14} />
						) : (
							<div className="column-content">
								{params.row.content}
							</div>
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
							<Skeleton variant="text" width={130} height={14} />
						) : (
							<div className="cellAction">
								{params.row.status ? (
									<div className="button done">Replied</div>
								) : (
									<div
										onClick={() =>
											navigate(`${params.row._id}`)
										}
										className="button viewButton"
										title="view"
									>
										Reply
									</div>
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
			<div
				className="table-feedback
       datatable"
			>
				<div className="datatableTitle">Feedback</div>

				<StyledDataGrid
					className="datagrid"
					rows={allFeedback ?? []}
					columns={feedbackColumns}
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

export default Feedback;
