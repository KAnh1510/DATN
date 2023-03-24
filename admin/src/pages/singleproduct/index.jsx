/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/productApi";
import images from "../../assets/images";
import { Navbar, SideBar } from "../../components";
import EditProduct from "../../components/editproduct";
import { VndFormat } from "../../utils";
import "./index.scss";

const SingleProduct = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const [isEdit, setEdit] = useState(false);
	const currentProduct = useSelector(
		(state) => state.products.currentProduct
	);

	useEffect(() => {
		getProduct(dispatch, params.productId);
	}, []);

	const handleEdit = () => {
		setEdit(true);
	};

	return (
		<div className="single-product">
			<SideBar />
			<div className="singleContainer">
				<Navbar />
				<div className="top">
					<div className="left">
						<div className="editButton" onClick={handleEdit}>
							Edit
						</div>
						<div className="details">
							<div className="details-right">
								<div className="detailItem">
									<span className="itemKey">
										Product Name:
									</span>
									<span className="itemValue">
										{currentProduct.name}
									</span>
								</div>
								<div className="detailItem">
									<span className="itemKey">Subtle: </span>
									<span className="itemValue">
										{currentProduct.subtle}
									</span>
								</div>
								<div className="detailItem">
									<span className="itemKey">Quality: </span>
									<span className="itemValue">
										{currentProduct.quality === 0 ? (
											<span style={{ color: "red" }}>
												Sold out
											</span>
										) : (
											currentProduct.quality
										)}
									</span>
								</div>
								<div className="detailItem">
									<span className="itemKey">Category: </span>
									<span className="itemValue">
										{currentProduct.categories}
									</span>
								</div>
								<div className="detailItem">
									<span className="itemKey">Prices: </span>
									<span className="itemValue">
										{VndFormat(currentProduct.prices)}
									</span>
								</div>
								<div className="detailItem">
									<span className="itemKey">Color: </span>
									<div className="product-color">
										{currentProduct?.color?.map((item) => (
											<span
												className="itemValue color-item"
												style={{
													backgroundColor:
														item.idColor,
												}}
												key={item._id}
											></span>
										))}
									</div>
								</div>
								<div className="detailItem">
									<span className="itemKey">Size: </span>
									<div>
										{currentProduct?.size?.length === 0 ? (
											<span style={{ color: "#212529" }}>
												No size
											</span>
										) : (
											currentProduct?.size?.map(
												(item) => (
													<span
														className="itemValue"
														key={item._id}
													>
														{item.name}
													</span>
												)
											)
										)}
									</div>
								</div>
							</div>

							<div className="details-left">
								{currentProduct?.gallery?.map((item) => (
									<img
										className="galleryItem"
										key={item._id}
										src={item.src ?? images.noImageProduct}
										alt=""
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{isEdit && (
					<div className="bottom">
						<EditProduct setCloseEdit={() => setEdit(false)} />
					</div>
				)}
			</div>
		</div>
	);
};

export default SingleProduct;
