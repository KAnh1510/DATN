import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Toastify = ({ openSnackbar, onClose, title, error }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			open={openSnackbar}
			onClose={onClose}
			key="top-right"
			autoHideDuration={6000}
		>
			<Alert
				onClose={onClose}
				severity={!error ? "success" : "error"}
				sx={{ width: "100%" }}
			>
				{!error ? `${title} Successfully!` : `${title} Failed!`}
			</Alert>
		</Snackbar>
	);
};

export default Toastify;
