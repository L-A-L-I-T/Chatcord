import React, { useState, useEffect } from "react";

import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";

import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
	downloadButton: {
		border: "1px solid",
		borderRadius: "50%",
		padding: "5px",
		marginRight: "10px",
	},
});

function File(props) {
	const classes = styles();
	const [filesrc, setFileSrc] = useState("");
	//const url = window.URL.createObjectURL(new Blob([props.blob]));
	useEffect(() => {
		const reader = new FileReader();
		reader.readAsDataURL(props.blob);
		reader.onloadend = function () {
			setFileSrc(reader.result);
		};
	}, [props.blob]);

	return (
		<div>
			<a href={filesrc} download={`${props.message.text.fileName}`}>
				<IconButton className={classes.downloadButton}>
					<VerticalAlignBottomIcon style={{ fontSize: "25px" }} />
				</IconButton>
			</a>
			{props.message.text.fileName}
			{/* <img src={filesrc} style={{ width: "150px", height: "auto" }} /> */}
		</div>
	);
}

export default File;
