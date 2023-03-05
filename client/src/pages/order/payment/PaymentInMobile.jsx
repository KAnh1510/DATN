import classnames from "classnames/bind";

import { useState } from "react";
import { CartIcon } from "~/components/icons";
import Images from "~/components/images";
import { VndFormat } from "~/utils";
import styles from "./Payment.module.scss";

const cx = classnames.bind(styles);

function PaymentInMobile({ productInCart, productList }) {
	const [showInfo, setShowInfo] = useState(false);
	const handleShowInfo = () => {
		setShowInfo(!showInfo);
	};
	let totalMoney = 0;
	return (
		<div className="row">
			<div className={cx("col l-0 m-12 c-12", "mobile")}>
				<div className={cx("display_info", "col", "l-0", "m-6", "c-6")}>
					<CartIcon width="2.3rem" height="2.3rem" />
					{!showInfo ? (
						<p>Hiển thị thông tin đơn hàng</p>
					) : (
						<p>Ẩn thông tin đơn hàng</p>
					)}
					<span onClick={handleShowInfo}>
						<ion-icon name="chevron-down-outline"></ion-icon>
					</span>
				</div>
				{showInfo &&
					productInCart.map((item, index) => {
						const {
							name,
							prices,
							imgFront,
							quantity,
							color,
							size,
						} = item;
						totalMoney = prices * quantity;
						return (
							<div className={cx("row", "prd-info")} key={index}>
								<div
									className={cx(
										"col m-2 c-2",
										"prd-img-wrapper"
									)}
								>
									<div className={cx("prd-img")}>
										<Images src={imgFront} />
									</div>
									<span className={cx("prd-quantity")}>
										{item.quantity}
									</span>
								</div>
								<div className={cx("col m-7 c-7", "prd-desc")}>
									<span className={cx("prd-name")}>
										{name}
									</span>
									<span className={cx("prd-size")}>
										Size: {size ? size : ""}
									</span>
									<span>
										Màu: &nbsp;
										<span
											style={{
												backgroundColor: `${color}`,
												border: "1px solid #cccccc",
												padding: "3px 10px",
												borderRadius: "50%",
											}}
										></span>
									</span>
								</div>
								<div className={cx("col m-3 c-3", "prd-price")}>
									<span>{VndFormat(totalMoney)}</span>
								</div>
							</div>
						);
					})}
				{showInfo && (
					<div className={cx("prd-total", "col", "m-12", "c-12")}>
						<table className={cx("total-line-table")}>
							<thead>
								<tr>
									<th scope="col"></th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr className={cx("total-line")}>
									<td>Tạm tính</td>
									<td>
										<span>{VndFormat(totalMoney)}</span>
									</td>
								</tr>

								<tr className={cx("total-line")}>
									<td>Phí vận chuyển</td>
									<td>
										<span
											className={cx(
												"order-summary-emphasis"
											)}
										>
											—
										</span>
									</td>
								</tr>
							</tbody>
							<tfoot className={cx("total-line-table-footer")}>
								<tr className={cx("total-line")}>
									<td className={cx("payment-due-label")}>
										<span
											className={cx(
												"payment-due-label-total"
											)}
										>
											Tổng cộng
										</span>
									</td>
									<td className={cx("payment-due")}>
										<span
											className={cx(
												"payment-due-currency"
											)}
										>
											VND
										</span>
										<span
											className={cx("payment-due-price")}
										>
											{VndFormat(totalMoney)}
										</span>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				)}
				<div
					className={cx("col", "l-0", "m-6")}
					style={{ height: "100%" }}
				>
					<div
						className={cx("payment-due-price")}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
						}}
					>
						{VndFormat(totalMoney)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaymentInMobile;
