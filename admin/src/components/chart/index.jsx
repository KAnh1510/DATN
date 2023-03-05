import { Skeleton } from "@mui/material";
import { React } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";
import "./index.scss";

const Chart = ({ aspect, title, dataChart, isFetching }) => {
	const data = [];
	dataChart.forEach((item) => {
		if (item._id === 1) {
			data.push({ name: "January", Total: item.total });
		} else if (item._id === 2) {
			data.push({ name: "February", Total: item.total });
		} else if (item._id === 3) {
			data.push({ name: "March", Total: item.total });
		} else if (item._id === 4) {
			data.push({ name: "April", Total: item.total });
		} else if (item._id === 5) {
			data.push({ name: "May", Total: item.total });
		} else if (item._id === 6) {
			data.push({ name: "June", Total: item.total });
		} else if (item._id === 7) {
			data.push({ name: "July", Total: item.total });
		}
	});

	return (
		<div className="chart">
			<div className="title">{title}</div>
			{isFetching ? (
				<Skeleton variant="rectangular" width={730} height={250} />
			) : (
				<ResponsiveContainer width="100%" aspect={aspect}>
					<AreaChart
						width={730}
						height={250}
						data={data}
						margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
					>
						<defs>
							<linearGradient
								id="total"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="#8884d8"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="#8884d8"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis dataKey="name" stroke="gray" />
						<CartesianGrid
							strokeDasharray="3 3"
							className="chartGrid"
						/>
						<Tooltip />
						<Area
							type="monotone"
							dataKey="Total"
							stroke="#8884d8"
							fillOpacity={1}
							fill="url(#total)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			)}
		</div>
	);
};

export default Chart;
