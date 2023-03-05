import classnames from "classnames/bind";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Images from "~/components/images";
import { VndFormat } from "~/utils";
import styles from "./Payment.module.scss";

const cx = classnames.bind(styles);

const ProductAmount = ({ discount }) => {
	const [discountUser, setDiscountUser] = useState("");
	const [discountSubmit, setDiscountSubmit] = useState(false);
	const productInCart = useSelector((state) => state.cart.products);
	const carts = useSelector((state) => state.cart.carts);

	return (
		<div className={cx("col l-5 m-0 c-0", "sidebar-content")}>
			{productInCart.map((item) => {
				const { _id, name, prices, color, size, quantity, imgFront } =
					item;
				return (
					<div className={cx("prd-info")} key={_id}>
						<div className={cx("prd-img-wrapper")}>
							<div className={cx("prd-img")}>
								<Images src={imgFront} />
							</div>
							<span className={cx("prd-quantity")}>
								{quantity}
							</span>
						</div>
						<div className={cx("col l-7", "prd-desc")}>
							<span className={cx("prd-name")}>
								{name.toLowerCase()}
							</span>
							<span className={cx("prd-size")}>
								Size: {size && size}
							</span>
							<span>
								Color: &nbsp;
								<span
									style={{
										backgroundColor: `${color}`,
										padding: "3px 10px",
										borderRadius: "50%",
									}}
								></span>
							</span>
						</div>
						<div className={cx("col l-3", "prd-price")}>
							<span>{VndFormat(prices)}</span>
						</div>
					</div>
				);
			})}
			<Form className={cx("discount")}>
				<Form.Group style={{ flex: "1" }}>
					<Form.Control
						onFocus={() => setDiscountSubmit(true)}
						onBlur={() => setDiscountSubmit(false)}
						placeholder="Discount"
						className={cx("form-control")}
						type="text"
						id="discount"
						name="discount"
						value={discount ? discount : discountUser}
						onChange={(e) => setDiscountUser(e.target.value)}
					/>
				</Form.Group>
				<Button
					variant="primary"
					disabled={discountSubmit ? false : true}
					type="submit"
					className={cx("discount-submit")}
				>
					Apply
				</Button>
			</Form>
			<div className={cx("prd-total")}>
				<table className={cx("total-line-table")}>
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<tr className={cx("total-line")}>
							<td>Provisional</td>
							<td>
								<span>{VndFormat(carts?.amount)}</span>
							</td>
						</tr>

						<tr className={cx("total-line")}>
							<td>Transport fee</td>
							<td>
								<span className={cx("order-summary-emphasis")}>
									—
								</span>
							</td>
						</tr>
					</tbody>
					<tfoot className={cx("total-line-table-footer")}>
						<tr className={cx("total-line")}>
							<td className={cx("payment-due-label")}>
								<span className={cx("payment-due-label-total")}>
									Total money
								</span>
							</td>
							<td className={cx("payment-due")}>
								<span className={cx("payment-due-currency")}>
									VND
								</span>
								<span className={cx("payment-due-price")}>
									{VndFormat(carts.amount)}
								</span>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

export default ProductAmount;
