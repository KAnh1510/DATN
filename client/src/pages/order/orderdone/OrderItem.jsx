import classnames from "classnames/bind";
import { useState } from "react";
import Images from "~/components/images";
import { VndFormat } from "~/utils";
import styles from "./OrderDone.module.scss";

const cx = classnames.bind(styles);

const OrderItem = ({ order, name, email, handelCancelOrder }) => {
	const [itemActive, setItemActive] = useState();

	const handleOpenCancel = (id) => {
		setItemActive(id);
	};
	const handleCloseCancel = () => {
		setItemActive(null);
	};
	const {
		_id,
		address,
		phoneNumber,
		note,
		products,
		amount,
		createdAt,
		status,
	} = order;
	const create_at = new Date(createdAt);
	return (
		<div className={cx("row", "wrapper")} key={_id}>
			<div className={cx("col l-4 m-6 c-12", "info")}>
				<div className={cx("item-wrapper")}>
					<span>Name:</span>
					<span>{name}</span>
				</div>
				<div className={cx("item-wrapper")}>
					<span>Email:</span>
					<span>{email}</span>
				</div>
				<div className={cx("item-wrapper")}>
					<span>Phone:</span>
					<span>{phoneNumber}</span>
				</div>
				<div className={cx("item-wrapper")}>
					<span>Address:</span>
					<span>{address}</span>
				</div>
				<div className={cx("item-wrapper")}>
					<span>Note:</span>
					<span>{note}</span>
				</div>
				<div className={cx("item-wrapper")}>
					<span>Created at: </span>
					<span>
						{`${create_at.toLocaleDateString()}  ${create_at.toLocaleTimeString()}`}{" "}
					</span>
				</div>
				<div className={cx("item-wrapper")}>
					<span>Delivery Status: </span>
					{status === 1 && (
						<span
							style={{
								padding: "6px 8px",
								borderRadius: "4px",
								color: "goldenrod",
								backgroundColor: "rgba(189, 189, 3, 0.103)",
							}}
						>
							Pending...
						</span>
					)}
					{status === 2 && (
						<span
							style={{
								padding: "6px 8px",
								borderRadius: "4px",
								color: "#00e1ff",
								backgroundColor: "rgba(0, 225, 255, 0.151)",
							}}
						>
							Delivering...
						</span>
					)}
					{status === 3 && (
						<span
							style={{
								padding: "6px 8px",
								borderRadius: "4px",
								color: "#D0021B",
								backgroundColor: "rgba(238, 56, 56, 0.122)",
							}}
						>
							Cancel
						</span>
					)}
					{status === 4 && (
						<span
							style={{
								padding: "6px 8px",
								borderRadius: "4px",
								color: "#008000",
								backgroundColor: "rgba(0, 128, 0, 0.122)",
							}}
						>
							Completed
						</span>
					)}
				</div>

				{status === 1 && (
					<div className={cx("cancel_order")}>
						{itemActive === _id ? (
							<div className={cx("btn-cancel")}>
								<button
									className={cx("btn-cancel-accept")}
									onClick={() => handelCancelOrder(_id)}
								>
									Confirm
								</button>
								<button
									className={cx("btn")}
									onClick={() => handleCloseCancel()}
								>
									Exit
								</button>
							</div>
						) : (
							<button
								className={cx("btn")}
								onClick={() => handleOpenCancel(_id)}
							>
								Cancel
							</button>
						)}
					</div>
				)}
			</div>
			<div className={cx("col l-2 m-6 c-12")}></div>
			<div className={cx("col l-6 m-6 c-12")}>
				<div className={cx("sidebar-content")}>
					{products?.map((item) => {
						const {
							_id,
							name,
							prices,
							imgFront,
							quantity,
							color,
							size,
						} = item;
						return (
							<div className={cx("row", "prd-info")} key={_id}>
								<div
									className={cx(
										"col l-2 m-2 c-2",
										"prd-img-wrapper"
									)}
								>
									<div className={cx("prd-img")}>
										<Images src={imgFront} />
									</div>
									<span className={cx("prd-quantity")}>
										{quantity}
									</span>
								</div>
								<div
									className={cx(
										"col l-7 m-7 c-7",
										"prd-desc"
									)}
								>
									<span className={cx("prd-desc-name")}>
										{name}
									</span>
									<span className={cx("prd-desc-size")}>
										{size}
									</span>
									<span
										className={cx("prd-desc-color")}
										style={{
											backgroundColor: `${color}`,
										}}
									></span>
								</div>
								<div
									className={cx(
										"col l-3 m-3 c-3",
										"prd-price"
									)}
								>
									<span>{VndFormat(prices)}</span>
								</div>
							</div>
						);
					})}

					<div className={cx("prd-total")}>
						<span>Total money: </span>
						<span>
							<span>VND &nbsp;</span>
							{VndFormat(amount)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
