import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomPagination, StyledDataGrid } from "../../components";
import { user } from "../../createInstance";
import Layout from "../../layouts";
import { VndFormat } from "../../utils";

const Revenue = () => {
	const [isFetching, setFetching] = useState(false);
	const [dataChart, setDataChart] = useState([]);

	const getMonthlyIncome = async () => {
		setFetching(true);
		await user
			.get("/orders/get-monthly")
			.then((response) => {
				setDataChart(response.data);
				setFetching(false);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getMonthlyIncome();
	}, []);

	const revenueColumns = [
		{
			field: "month",
			headerName: "Month",
			width: 200,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={180} height={14} />
						) : (
							<div>{params.row._id} / 2023</div>
						)}
					</div>
				);
			},
		},
		{
			field: "amount",
			headerName: "Sale Amount",
			width: 200,
			renderCell: (params) => {
				return (
					<div>
						{isFetching ? (
							<Skeleton variant="text" width={180} height={14} />
						) : (
							VndFormat(params.row.total)
						)}
					</div>
				);
			},
		},
	];
	return (
		<Layout>
			<div className="table-orders datatable">
				<div className="datatableTitle">Revenue</div>

				<StyledDataGrid
					className="datagrid"
					rows={dataChart ?? []}
					columns={revenueColumns}
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

export default Revenue;
