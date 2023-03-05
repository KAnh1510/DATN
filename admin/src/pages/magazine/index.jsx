/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllMagazine } from "../../api/magazineApi";
import Layout from "../../layouts";
import { formatDate } from "../../utils";
import "./index.scss";

const Magazine = () => {
	const dispatch = useDispatch();
	const { allMagazine, isFetching } = useSelector((state) => state.magazine);

	useEffect(() => {
		getAllMagazine(dispatch);
	}, []);

	return (
		<Layout>
			<div className="datatable magazine">
				<div className="datatableTitle">
					Magazine
					<div className="button-right">
						<Link to={"/magazine/new"} className="link">
							Add New
						</Link>
					</div>
				</div>

				<div className="magazine-content-list">
					{allMagazine.map((item) => (
						<div className="magazine-content-item" key={item._id}>
							{isFetching ? (
								<Skeleton
									variant="rectangular"
									width={300}
									height={169}
								/>
							) : (
								<div className="magazine-img">
									<Link
										to={`/magazine/${item._id}`}
										title="view"
									>
										<img
											src={item.gallery[0]?.src}
											alt=""
										/>
									</Link>
								</div>
							)}

							<div className="magazine-info">
								{isFetching ? (
									<Skeleton width={300} height={20} />
								) : (
									<Link
										to={`/magazine/${item._id}`}
										className="magazine-title"
										title="view"
									>
										{item.title}
									</Link>
								)}
								<div className="magazine-sub">
									{isFetching ? (
										<Skeleton width={300} height={14} />
									) : (
										<>
											<div className="magazine-writer">
												{item.writer}
											</div>
											<div className="magazine-date">
												{formatDate(item.updatedAt)}
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Magazine;
