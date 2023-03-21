import { Skeleton } from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleOrder } from "../../api/orderApi";
import { Navbar, SideBar } from "../../components";
import { VndFormat } from "../../utils";
import "./index.scss";

const SingleOrder = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const { currentOrder, isFetching } = useSelector((state) => state.orders);
	const productInOrder = currentOrder.products;

	useEffect(() => {
		getSingleOrder(dispatch, params.orderId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="single-order single-item">
			<SideBar />
			<div className="singleContainer">
				<Navbar />
				<div className="top">
					<div className="left">
						<div className="details">
							<div className="details-right">
								<div className="detailItem">
									<span className="itemKey">User Name:</span>
									{isFetching ? (
										<Skeleton
											variant="text"
											width={210}
											height={20}
										/>
									) : (
										<span className="itemValue">
											{currentOrder.name}
										</span>
									)}
								</div>
								<div className="detailItem">
									<span className="itemKey">Address: </span>
									{isFetching ? (
										<Skeleton
											variant="text"
											width={210}
											height={20}
										/>
									) : (
										<span className="itemValue">
											{currentOrder.address}
										</span>
									)}
								</div>
								<div className="detailItem">
									<span className="itemKey">Phone: </span>
									{isFetching ? (
										<Skeleton
											variant="text"
											width={210}
											height={20}
										/>
									) : (
										<span className="itemValue">
											{currentOrder.phoneNumber}
										</span>
									)}
								</div>
								<div className="detailItem">
									<span className="itemKey">Note: </span>
									{isFetching ? (
										<Skeleton
											variant="text"
											width={210}
											height={20}
										/>
									) : (
										<span className="itemValue">
											{currentOrder.note}
										</span>
									)}
								</div>
								<div className="detailItem">
									<span className="itemKey">Status: </span>
									{isFetching ? (
										<Skeleton
											variant="text"
											width={210}
											height={20}
										/>
									) : (
										<span className="itemValue">
											{currentOrder.status === 1 && (
												<span className="pending">
													Pending
												</span>
											)}
											{currentOrder.status === 2 && (
												<span className="delivery">
													Delivery
												</span>
											)}
											{currentOrder.status === 3 && (
												<span className="cancel">
													Cancel
												</span>
											)}
											{currentOrder.status === 4 && (
												<span className="complete">
													Completed
												</span>
											)}
										</span>
									)}
								</div>
							</div>

							<div className="details_left-order">
								{isFetching ? (
									<Skeleton
										variant="text"
										width={210}
										height={20}
									/>
								) : (
									productInOrder?.map((item) => (
										<div
											key={item._id}
											className="order_product-info"
										>
											<div className="img_quantity">
												<img
													src={item.imgFront}
													alt=""
												/>
												<span className="quantity">
													{item.quantity}
												</span>
											</div>
											<div style={{ width: "100%" }}>
												<div
													onClick={() =>
														navigate(
															`/products/${item.productId}`
														)
													}
													className="product-name"
												>
													{item.name}
												</div>
												<div className="df">
													<span>Size: </span>
													<span>{item.size}</span>
												</div>
												<div className="df">
													<span>Color: </span>
													<span
														className="color"
														style={{
															backgroundColor:
																item.color,
														}}
													></span>
												</div>
												<div className="df">
													<span>Prices: </span>
													<span>
														{VndFormat(item.prices)}
													</span>
												</div>
											</div>
										</div>
									))
								)}

								<div className="amount">
									<span>Total:</span>
									{isFetching ? (
										<Skeleton
											variant="text"
											width={210}
											height={20}
										/>
									) : (
										<span
											style={{
												color: "#D0021B",
											}}
										>
											{VndFormat(currentOrder.amount)}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleOrder;
