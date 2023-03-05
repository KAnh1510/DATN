import classnames from "classnames/bind";
import { NavLink, Outlet } from "react-router-dom";
import User from "~/components/user";
import styles from "./Shop.module.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "~/api/categoryApi";
import DefaultLayout from "~/layout/DefaultLayout";

const cx = classnames.bind(styles);

function Shop() {
	const dispatch = useDispatch();
	const categories = useSelector(
		(state) => state.categories.categories.allCategories
	);
	useEffect(() => {
		getAllCategories(dispatch);
	}, []);

	return (
		<DefaultLayout>
			<div className={cx("wrapper")}>
				<div className={cx("banner", "col c-12")}>
					<img
						src="https://file.hstatic.net/200000436739/file/banner-shop-01_2138b3e555b142c699a9ece6eace8f45.jpg"
						alt="Welcome"
					/>
				</div>
				<div className={cx("collection", "row")}>
					<div className={cx("title", "col", "l-10", "m-12", "c-12")}>
						<ul>
							<li>
								<NavLink
									className={({ isActive }) =>
										isActive ? cx("active") : " "
									}
									to="all"
								>
									All
								</NavLink>
							</li>
							{categories?.map((item) => (
								<li key={item._id}>
									<NavLink
										className={({ isActive }) =>
											isActive ? cx("active") : " "
										}
										to={item.name.toLowerCase()}
									>
										{item.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
					<div className={cx("choose", "col", "l-2", "m-0", "c-0")}>
						<User />
					</div>
				</div>
				<Outlet />
			</div>
		</DefaultLayout>
	);
}

export default Shop;
