import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function customCheckbox(theme) {
	return {
		"& .MuiCheckbox-root svg": {
			width: 16,
			height: 16,
			backgroundColor: "transparent",
			border: `1px solid ${
				theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
			}`,
			borderRadius: 2,
		},
		"& .MuiCheckbox-root svg path": {
			display: "none",
		},
		"& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
			backgroundColor: "#1890ff",
			borderColor: "#1890ff",
		},
		"& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
			position: "absolute",
			display: "table",
			border: "2px solid #fff",
			borderTop: 0,
			borderLeft: 0,
			transform: "rotate(45deg) translate(-50%,-50%)",
			opacity: 1,
			transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
			content: '""',
			top: "50%",
			left: "39%",
			width: 5.71428571,
			height: 9.14285714,
		},
		"& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
			{
				width: 8,
				height: 8,
				backgroundColor: "#1890ff",
				transform: "none",
				top: "39%",
				border: 0,
			},
	};
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	WebkitFontSmoothing: "auto",
	letterSpacing: "normal",
	"& .MuiDataGrid-footerContainer": {
		borderTop: "none",
	},
	...customCheckbox(theme),
}));

export default StyledDataGrid;
