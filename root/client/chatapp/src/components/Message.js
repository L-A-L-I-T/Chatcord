import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
const styles = makeStyles((theme) => ({
	container: {
		borderRadius: "10px",
		background: `linear-gradient(to right,${theme.palette.common.magenta} , ${theme.palette.common.purple})`,
		width: "100%",
	},
}));

function Message({ message, name }) {
	const classes = styles();
	return (
		<div className={`${classes.container}`}>
			{message.user === name ? (
				<div style={{ float: "right" }}>
					<div>
						{message.user}
						{message.text}
					</div>
				</div>
			) : (
				<div style={{ float: "left" }}>
					<div>
						<Typography>{message.user}</Typography>
						<Typography>{message.text}</Typography>
					</div>
				</div>
			)}
		</div>
	);
}

export default Message;
