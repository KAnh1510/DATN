/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalOrders } from "../../api/orderApi";
import { getTotalUsers } from "../../api/userApi";
import { Chart, Featured, Navbar, SideBar, Widget } from "../../components";
import { user } from "../../createInstance";
import { VndFormat } from "../../utils";
import "./index.scss";

const Home = () => {
	const dispatch = useDispatch();
	const totalUser = useSelector((state) => state.users.totalUser);
	const totalOrder = useSelector((state) => state.orders.totalOrder);
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
		getTotalUsers(dispatch);
		getTotalOrders(dispatch);
		getMonthlyIncome();
	}, []);

	const getTotalBalance = () => {
		let totalBalance = 0;
		const date = new Date();
		const month = date.getMonth() + 1;
		dataChart.forEach((item) => {
			if (item._id === month) {
				totalBalance = item.total;
			}
		});
		return VndFormat(totalBalance);
	};

	const getDiffBalance = () => {
		let amountMonth = 0;
		let amountLastMonth = 0;
		const date = new Date();
		const month = new Date(date.setMonth(date.getMonth() + 1));
		const lastMonth = new Date(new Date().setMonth(month.getMonth() - 1));

		dataChart.forEach((item) => {
			if (item._id === month.getMonth()) {
				amountMonth = item.total;
			}
			if (item._id === lastMonth.getMonth()) {
				amountLastMonth = item.total;
			}
		});

		return (amountMonth / amountLastMonth).toFixed(1);
	};

	return (
		<div className="home">
			<SideBar />
			<div className="homeContainer">
				<Navbar />
				<div className="widgets">
					<Widget type="user" amount={totalUser} diff={20} />
					<Widget type="order" amount={totalOrder} diff={20} />
					<Widget
						type="balance"
						amount={getTotalBalance()}
						diff={getDiffBalance()}
					/>
				</div>
				<div className="charts">
					<Featured />
					<Chart
						title="Last 6 Months (Revenue)"
						aspect={2 / 1}
						dataChart={dataChart}
						isFetching={isFetching}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
