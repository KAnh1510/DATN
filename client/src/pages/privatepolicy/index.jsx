import { useEffect } from "react";
import Pages from "~/layout/components/Pages";

function PrivatePolicy() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<Pages title="Private Policy">
			<div>
				<p>
					This Privacy Policy helps you understand how The website
					collects and uses your personal information through the use
					of the website, including any information possible provide
					information through the website when you register for an
					account account, sign up to receive communications from us,
					or When you buy products or services, ask for more
					information service from us.
				</p>
				<p>
					We use your personal information to communicate as necessary
					in connection with your use of our website, answer
					questions, or send documents and information you request..
				</p>
				<p>
					Our website takes information security seriously and uses
					best practices to protect customer information and payments.
				</p>
				<p>
					All transaction information will be kept confidential unless
					required by law enforcement.
				</p>
			</div>
		</Pages>
	);
}

export default PrivatePolicy;
