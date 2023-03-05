import Pages from "~/layout/components/Pages";

import classnames from "classnames/bind";
import { useEffect } from "react";
import styles from "./ReturnPolicy.module.scss";

const cx = classnames.bind(styles);
function ReturnPolicy() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<Pages title="Return Policy">
			<div className={cx("wrapper")}>
				<p>
					<strong>1. Return conditions</strong>
				</p>
				<p>
					Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể
					đổi hàng/ trả lại hàng ngay tại thời điểm giao/nhận hàng
					trong những trường hợp sau:
				</p>
				<ul>
					<li>
						Item does not match the type and model code in the
						ordered order or as on the website at the time of
						ordering.
					</li>
					<li>
						Not enough quantity, not enough set as in the order.
					</li>
					<li>
						External conditions are affected such as tearing of the
						packaging, peeling broken, broken
					</li>
				</ul>
				<p>
					Customers are responsible for presenting relevant documents
					to prove the above omission to complete the return/exchange
					chemistry.
				</p>
				<p>
					<br />
				</p>
				<p>
					<strong>
						2. Regulations on time to notify and send exchanged
						products pay
					</strong>
				</p>

				<ul>
					<li>
						<strong>Return notice time</strong>: within 48 hours
						from the time of receiving the product in case the
						product is missing accessories, gifts, or broken.
					</li>
					<li>
						<strong>Product delivery time</strong>: within 14 days
						from receipt of the product.
					</li>
					<li>
						<strong>Product return location</strong>: Customer can
						bring the goods directly to your office/store us or by
						mail.
					</li>
				</ul>
				<p>
					Customers can bring goods directly to your office/store us
					or by mail.
				</p>
			</div>
		</Pages>
	);
}

export default ReturnPolicy;
