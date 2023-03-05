import { Skeleton } from "@mui/material";
import { React } from "react";
import { useSelector } from "react-redux";
import { formatDateTime, VndFormat } from "../../utils";
import CustomPagination from "../custompagination";
import StyledDataGrid from "../styleddatagrid";
import "./index.scss";

const List = () => {
	const { isFetching, currentUserOrder } = useSelector(
		(state) => state.users
	);
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
			width: 130,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={110} height={14} />
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
			width: 130,
			renderCell: (params) => {
				return (
					<>
						{isFetching ? (
							<Skeleton variant="text" width={110} height={14} />
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
	];

	return (
		<StyledDataGrid
			className="datagrid"
			rows={currentUserOrder ?? []}
			columns={orderColumns}
			pageSize={9}
			rowsPerPageOptions={[9]}
			components={{
				Pagination: CustomPagination,
			}}
			getRowId={(row) => row._id}
		/>
	);
};

export default List;
