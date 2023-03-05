import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../api/productApi";
import "./index.scss";

const Search = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState("");

	const handleSearchTextChange = (e) => {
		const searchText = e.target.value;
		if (!searchText.startsWith(" ")) {
			setSearchText(searchText);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			searchProduct(dispatch, { searchString: searchText });
		}
	};

	return (
		<div className="search">
			<input
				type="text"
				placeholder="Search..."
				value={searchText}
				spellCheck={false}
				onChange={handleSearchTextChange}
				onKeyUp={handleKeyPress}
			/>
			<SearchOutlinedIcon />
		</div>
	);
};

export default Search;
