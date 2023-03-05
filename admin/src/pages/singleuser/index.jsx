import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderUser, getUser } from "../../api/userApi";
import images from "../../assets/images";
import { Navbar, SideBar } from "../../components";
import "./index.scss";

const SingleUser = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const user = useSelector((state) => state.users.user);

	const handleEditUser = () => {};

	useEffect(() => {
		getUser(dispatch, params.userId);
		getOrderUser(dispatch, params.userId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="single-user">
			<SideBar />
			<div className="singleContainer">
				<Navbar />
				<div className="content">
					<div className="top">
						<div className="left">
							<div
								className="editButton"
								onClick={handleEditUser}
							>
								Edit
							</div>
							<h1 className="title">Information</h1>
							<div className="item">
								<img
									src={
										user.avatar
											? user.avatar.file
											: images.noImageUser
									}
									alt=""
									className="itemImg"
								/>
								<div className="details">
									<h1 className="itemTitle">
										{user.username}
									</h1>
									<div className="detailItem">
										<span className="itemKey">Email:</span>
										<span className="itemValue">
											{user.email}
										</span>
									</div>
									<div className="detailItem">
										<span className="itemKey">Phone:</span>
										<span className="itemValue">
											{user.phoneNumber}
										</span>
									</div>
									<div className="detailItem">
										<span className="itemKey">
											Address:
										</span>
										<span className="itemValue">
											{user.address}
										</span>
									</div>
									<div className="detailItem">
										<span className="itemKey">
											Country:
										</span>
										<span className="itemValue">
											Viet Nam
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleUser;
