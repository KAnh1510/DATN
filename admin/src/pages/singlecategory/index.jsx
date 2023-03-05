import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory } from "../../api/categoryApi";
import { Navbar, SideBar } from "../../components";
import "./index.scss";

const SingleCategory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { currentCategory } = useSelector((state) => state.categories);
	const { allProduct } = useSelector((state) => state.products);

	useEffect(() => {
		getCategory(dispatch, params.categoryId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="single-item single-category">
			<SideBar />
			<div className="singleContainer">
				<Navbar />
				<div className="top">
					<div className="left">
						<div className="detailItem">
							<span className="itemKey">Category name: </span>
							<span className="itemValue">
								{currentCategory?.name}
							</span>
						</div>
						<div className="product_list">
							{allProduct.length === 0 ? (
								<span>No product in category</span>
							) : (
								allProduct.map((item) => (
									<div
										key={item._id}
										className="product-info"
										onClick={() =>
											navigate(`/products/${item._id}`)
										}
									>
										<div className="img_quantity">
											<img
												src={item.gallery[0]?.file}
												alt=""
											/>
										</div>
										<div>{item.name}</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCategory;
