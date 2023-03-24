import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import classnames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "~/api/productApi";
import Paging from "~/components/pagination";
import ShowListProduct from "../../components/productinlist";
import styles from "./Collection.module.scss";

const cx = classnames.bind(styles);
function Categories() {
	const pageSize = 8;
	const dispatch = useDispatch();
	const params = useParams();
	const [pageNumber, setPageNumber] = useState(1);
	const [count, setCount] = useState(1);
	const productList = useSelector(
		(state) => state.products.products.allProducts
	);
	const isFetching = useSelector(
		(state) => state.products.products.isFetching
	);
	const totalCount = productList?.length;

	useEffect(() => {
		getProductsByCategory(dispatch, params.type);
		setPageNumber(1);
		setCount(Math.ceil(parseInt(totalCount) / pageSize));
	}, [params.type, totalCount]);

	return (
		<div>
			<div className={cx("wrapper")}>
				{isFetching ? (
					<Stack
						sx={{ color: "grey.500" }}
						spacing={2}
						direction="row"
						paddingLeft="16px"
					>
						<CircularProgress size={30} color="info" />
					</Stack>
				) : (
					<>
						{productList
							.slice(
								(pageNumber - 1) * pageSize,
								pageNumber * pageSize
							)
							?.map((product) => {
								return (
									<div
										key={product._id}
										className={cx("product")}
									>
										<ShowListProduct item={product} />
									</div>
								);
							})}
						<div className={"col l-12"}>
							<div className={cx("pagination")}>
								<Paging
									count={count}
									setPageNumber={setPageNumber}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default React.memo(Categories);
