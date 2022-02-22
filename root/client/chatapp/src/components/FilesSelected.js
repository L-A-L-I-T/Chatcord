import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		padding: "5px",
		border: "1px solid",
		borderRadius: "5px",
		borderColor: theme.palette.common.gray,
	},
}));

function FilesSelected(props) {
	const classes = styles();
	return (
		<div className={classes.container}>
			<Typography>{props.fileName}</Typography>
		</div>
	);
}

export default FilesSelected;
