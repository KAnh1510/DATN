import { faFileText } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import classnames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Images from "~/components/images";
import DefaultLayout from "~/layout/DefaultLayout";
import { formatDate } from "~/utils";
import styles from "./News.module.scss";

const cx = classnames.bind(styles);

function News() {
	const navigate = useNavigate();
	const magazine = useSelector((state) => state.magazine.magazine);
	const isFetching = useSelector((state) => state.magazine.isFetching);

	return (
		<DefaultLayout>
			<div className={cx("header")}>
				<span>
					<Link to="/">Home</Link>
					<span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
				</span>
				<span
					className={cx("header_type")}
					onClick={() => {
						navigate("/magazine");
					}}
				>
					Magazine &nbsp;&nbsp;/&nbsp;&nbsp;
				</span>
				<span>{magazine?.title}</span>
			</div>
			<div className={cx("wrapper", "grid")}>
				{isFetching ? (
					<Stack
						sx={{ color: "grey.500" }}
						spacing={2}
						direction="row"
						paddingLeft="16px"
					>
						<CircularProgress size={30} color="info" />
					</Stack>
				) : (
					<div className={cx("row")}>
						<div className={cx("col l-3")} />
						<div className={cx("col l-9")}>
							<Images
								src={magazine.gallery[0].src}
								alt={magazine.gallery[0].alt}
							/>
							<h1>{magazine.title}</h1>
							<ul>
								<li>
									Writer: {magazine.writer.toUpperCase()} at
									&nbsp;
									<time
										dateTime={formatDate(
											magazine.createdAt
										)}
										className={cx("create-date")}
										pubdate={formatDate(magazine.createdAt)}
									>
										{formatDate(magazine.createdAt)}
									</time>
								</li>
								<li>
									<FontAwesomeIcon icon={faFileText} />
									<Link to="">News</Link>
								</li>
							</ul>
							<div className={cx("article-pages")}>
								{magazine.gallery.map((item) => (
									<p key={item._id}>
										<Images src={item.src} alt={item.alt} />
									</p>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
}

export default News;
