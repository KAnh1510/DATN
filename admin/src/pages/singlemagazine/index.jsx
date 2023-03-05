import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMagazine } from "../../api/magazineApi";
import images from "../../assets/images";
import { Navbar, SideBar } from "../../components";
import EditMagazine from "../../components/editmagazine";
import { user } from "../../createInstance";
import { formatDateTime } from "../../utils";

const SingleMagazine = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const [isEdit, setEdit] = useState(false);
	const { currentMagazine } = useSelector((state) => state.magazine);

	useEffect(() => {
		getMagazine(dispatch, params.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDelete = async () => {
		await user.delete(`/magazine/remove/${params.id}`).then((response) => {
			if (response.status === 200) {
				navigate("/magazine");
			}
		});
	};

	return (
		<div className="single-item">
			<SideBar />
			<div className="singleContainer">
				<Navbar />
				<div className="top">
					<div className="left">
						<div
							className="editButton"
							onClick={() => setEdit(true)}
						>
							Edit
						</div>
						<div className="removeButton" onClick={handleDelete}>
							Delete
						</div>
						<div className="details">
							<div className="details-right">
								<div className="detailItem">
									<span className="itemKey">Title: </span>
									<span className="itemValue">
										{currentMagazine?.title}
									</span>
								</div>
								<div className="detailItem">
									<span className="itemKey">Writer: </span>
									<span className="itemValue">
										{currentMagazine?.writer}
									</span>
								</div>
								<div className="detailItem">
									<span className="itemKey">Date: </span>
									<span className="itemValue">
										{formatDateTime(
											currentMagazine?.updatedAt
										)}
									</span>
								</div>
							</div>
							<div className="details-left">
								<Grid container spacing={0.5}>
									{currentMagazine?.gallery?.map((item) => (
										<Grid item xs={4} key={item._id}>
											<img
												key={item._id}
												src={
													item.src ??
													images.noImageProduct
												}
												alt=""
											/>
										</Grid>
									))}
								</Grid>
							</div>
						</div>
					</div>
				</div>
				{isEdit && (
					<div className="bottom">
						<EditMagazine setCloseEdit={() => setEdit(false)} />
					</div>
				)}
			</div>
		</div>
	);
};

export default SingleMagazine;
