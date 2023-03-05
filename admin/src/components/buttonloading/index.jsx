import { LoadingButton } from "@mui/lab";
import React from "react";
import { SaveIcon } from "../../assets/icon";

const ButtonLoading = ({ handleOnclick, isFetching, action }) => {
	return (
		<div className="update-btn">
			<LoadingButton
				color="secondary"
				onClick={handleOnclick}
				loading={isFetching}
				loadingPosition="start"
				startIcon={<SaveIcon />}
				variant="contained"
				type="submit"
			>
				<span>{action}</span>
			</LoadingButton>
		</div>
	);
};

export default ButtonLoading;
