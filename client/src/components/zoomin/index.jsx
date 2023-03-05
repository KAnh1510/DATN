import PropTypes from "prop-types";
import { useState } from "react";
import Viewer from "react-viewer";

import Images from "~/components/images";
import "./ZoomIn.scss";

function ZoomIn({ props }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [visible, setVisible] = useState("false");

	return (
		<>
			{props.map((item, index) => (
				<div key={index} className="img-item col c-0">
					<Images
						alt="aaaaa"
						src={item.src}
						width="100%"
						cursor="pointer"
						onClick={() => {
							setVisible("true");
							setActiveIndex(index);
						}}
					/>
				</div>
			))}
			<Viewer
				visible={visible}
				onClose={() => {
					setVisible(false);
				}}
				zoomSpeed={0.2}
				images={props}
				activeIndex={activeIndex}
			/>
		</>
	);
}

ZoomIn.propTypes = {
	props: PropTypes.array.isRequired,
};

export default ZoomIn;
