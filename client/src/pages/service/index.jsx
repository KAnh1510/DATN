import { useEffect } from "react";
import Pages from "~/layout/components/Pages";

function Service() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<Pages title="Terms of Service">
			<p>
				<strong>1. About</strong>
			</p>
			<p>Welcome to our website.</p>
			<p>
				When you visit our website, you agree to these terms. The
				Website reserves the right to change, modify, add or remove any
				part of these Terms of Sale, at any time. Changes are effective
				immediately upon posting on the website without prior notice.
				And when you continue to use the website, after changes to these
				Terms are posted, it means that you accept those changes.
			</p>
			<p>Please check back often to keep up to date with our changes.</p>
			<p>
				<strong>2. Instructions for using the website</strong>
			</p>
			<p>
				When accessing our website, customers must ensure to be at least
				18 years old, or access under the supervision of a parent or
				legal guardian. Customers certainly have full civil actions to
				carry out transactions of purchase and sale of goods by current
				regulations of Vietnamese law.
			</p>
			<p>
				During the registration process, you agree to receive
				promotional emails from the website. If you do not wish to
				continue receiving mail, you can opt-out by clicking the link at
				the bottom of any promotional email.
			</p>
			<p>
				<br />
			</p>
			<p>
				<strong>3. Safe and convenient payment</strong>
			</p>
			<p>
				Buyers can refer to the following payment methods and choose to
				apply the appropriate method:
			</p>
			<p>
				<strong>
					<u>Method 1</u>
				</strong>
				: Direct payment (buyers receive goods at the seller's address)
				<br />
				<strong>
					<u>Method 2</u>
				</strong>
				<strong>:</strong>&nbsp;Pay later (COD – delivery and collection
				of money)
				<br />
				<strong>
					<u>Method 3</u>
				</strong>
				<strong>:</strong>
				&nbsp;Online payment via credit card, bank transfer
			</p>
		</Pages>
	);
}

export default Service;
