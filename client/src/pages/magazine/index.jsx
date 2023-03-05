import classnames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./Magazine.module.scss";

import { Box, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMagazine, getMagazine } from "~/api/magazineApi";
import HeaderPage from "~/layout/components/HeaderPage";
import DefaultLayout from "~/layout/DefaultLayout/DefaultLayout";
import { formatDate } from "~/utils";

const cx = classnames.bind(styles);

function Magazine() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const allMagazines = useSelector((state) => state.magazine.allMagazine);
	const isFetching = useSelector((state) => state.magazine.isFetchingAll);

	useEffect(() => {
		getAllMagazine(dispatch);
	}, []);

	const handleClick = async (id) => {
		await getMagazine(dispatch, id);
		navigate(`/magazine/${id}`);
	};

	return (
		<DefaultLayout>
			<HeaderPage title="News" />
			<div className={cx("container", "grid")}>
				<h2 className={cx("header")}>News</h2>
				{isFetching ? (
					<Box sx={{ width: 500 }}>
						<Skeleton animation="wave" height={100} />
					</Box>
				) : (
					allMagazines.map((item) => (
						<div className={cx("content", "row")} key={item._id}>
							<div className={cx("col l-4")}>
								<div
									onClick={() => handleClick(item._id)}
									className={cx("img_wrapper")}
								>
									<img
										className={cx("img")}
										src={item.gallery[0].src}
										alt={item.gallery[0].alt}
									/>
								</div>
							</div>
							<div className={cx("title", "col l-4")}>
								<div className={cx("title-link")}>
									<div
										onClick={() => handleClick(item._id)}
										className={cx("title-link")}
										title={item.title}
									>
										{item.title}
									</div>
								</div>
								<span className={cx("subtitle")}>
									Writer: {item.writer} /&nbsp;
									<span className={cx("create-date")}>
										{formatDate(item.createdAt)}
									</span>
								</span>
							</div>
						</div>
					))
				)}
			</div>
		</DefaultLayout>
	);
}

export default Magazine;
