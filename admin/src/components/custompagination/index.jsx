import { Pagination, PaginationItem } from "@mui/material";
import {
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";
import React from "react";

function CustomPagination() {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			color="primary"
			variant="outlined"
			shape="rounded"
			page={page + 1}
			count={pageCount}
			className="pagination"
			// @ts-expect-error
			renderItem={(props2) => (
				<PaginationItem {...props2} disableRipple />
			)}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	);
}

export default CustomPagination;
