import { Pagination } from "@mui/material";
import PropTypes from "prop-types";
import "./index.scss";

function Paging(props) {
	const { count, setPageNumber } = props;

	return (
		<div className="pagination">
			<Pagination
				count={count}
				shape="rounded"
				onChange={(_event, value) => setPageNumber(value)}
			/>
		</div>
	);
}

Paging.propTypes = {
	count: PropTypes.number.isRequired,
	setPageNumber: PropTypes.func,
};

export default Paging;
