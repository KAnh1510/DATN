import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadlessTippy from "@tippyjs/react/headless";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useDebounce } from "~/components/hooks";
import { SearchIcon } from "~/components/icons";
import { Wrapper } from "~/components/popper";
import { VndFormat } from "~/utils";
import Images from "../../images";
import styles from "./Search.module.scss";

const cx = classnames.bind(styles);

function Search({ setShowSearch }) {
	const [showResults, setShowResults] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const debouncedValue = useDebounce(searchText, 500);

	const inputRef = useRef();

	const productList = useSelector(
		(state) => state.products.products.allProducts
	);

	useMemo(() => {
		if (!debouncedValue.trim()) {
			setSearchResults([]);
			return;
		}
		const results = productList.filter((product) => {
			const name = product.name.toLowerCase();
			return name.includes(debouncedValue.toLowerCase());
		});
		setSearchResults(results);
	}, [debouncedValue]);

	const handleSearchTextChange = (e) => {
		const searchText = e.target.value;
		if (!searchText.startsWith(" ")) {
			setSearchText(searchText);
		}
		if (!setShowSearch) return;
	};

	const handelHideResults = () => {
		setShowResults(false);
	};

	const handelClose = () => {
		setShowSearch(false);
	};
	return (
		<>
			<div className={cx("header")}>
				<p className={cx("title")}>Search</p>
				<div className={cx("close")}>
					<FontAwesomeIcon
						icon={faTimesCircle}
						onClick={handelClose}
					/>
				</div>
			</div>
			<HeadlessTippy
				interactive
				visible={showResults && searchResults.length > 0}
				render={(attrs) => (
					<div
						className={cx("search-results")}
						tabIndex="-1"
						{...attrs}
					>
						<Wrapper>
							{searchResults.map((result) => (
								<Link
									to={`/products/${result?._id}`}
									className={cx("wrapper")}
									key={result._id}
								>
									<div className={cx("info")}>
										<p className={cx("name")}>
											{result?.name}
										</p>
										<span className={cx("prices")}>
											{VndFormat(result?.prices)}
										</span>
									</div>
									<Images
										className={cx("image")}
										src={result?.imgFront}
										alt={result?.name}
									/>
								</Link>
							))}
						</Wrapper>
					</div>
				)}
				onClickOutside={handelHideResults}
			>
				<div className={cx("search", "col c-12")}>
					<input
						ref={inputRef}
						type="text"
						value={searchText}
						spellCheck={false}
						onChange={handleSearchTextChange}
						onFocus={() => setShowResults(true)}
						placeholder="Search..."
						size="20"
					/>

					<button className={cx("search-btn")}>
						<SearchIcon />
					</button>
				</div>
			</HeadlessTippy>
		</>
	);
}

Search.propTypes = {
	setShowSearch: PropTypes.func,
};

export default React.memo(Search);
