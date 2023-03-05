import classnames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";

import PageAccountAddress from "~/layout/components/PageAccountAddress";
import EditAddress from "../addressuser/edit";
import HeaderAddress from "../addressuser/headeraddress";
import ViewAddress from "../addressuser/view";
import styles from "./index.scss";

const cx = classnames.bind(styles);

function Address() {
	const [edit, setEdit] = useState(false);
	const params = useParams();

	return (
		<PageAccountAddress title="Address information" userId={params.id}>
			<div className={cx("col l-7 m-9")}>
				<HeaderAddress setEdit={setEdit} edit={edit} />
				<div className={cx("address-table")}>
					{edit ? <EditAddress setEdit={setEdit} /> : <ViewAddress />}
				</div>
			</div>
		</PageAccountAddress>
	);
}

export default Address;
