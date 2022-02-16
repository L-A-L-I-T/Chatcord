import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton } from "@material-ui/core";

import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";

import File from "./File";

const styles = makeStyles((theme) => ({
	container: {
		margin: "20px 0px ",
	},
	messageBox: {
		padding: "10px",
	},
	ownMessage: {
		background: `linear-gradient(to right,${theme.palette.common.magenta} , ${theme.palette.common.purple})`,
		borderRadius: "10px 10px 0px 10px",
		marginLeft: "auto",
		maxWidth: "60%",
		overflowWrap: "break-word",
	},
	diffUserMessage: {
		background: `linear-gradient(to right,${theme.palette.common.magenta} , ${theme.palette.common.purple})`,
		borderRadius: "10px 10px 10px 0px",
		maxWidth: "60%",
	},
	botMessage: {
		background: `${theme.palette.common.gray}`,
		borderRadius: "10px",
		width: "50%",
		margin: "auto",
	},
}));

let blob;

function Message({ message, name }) {
	if (message.text.type === "file") {
		blob = new Blob([message.text.body], { type: message.text.mimeType });
		console.log(blob);
	}

	const classes = styles();
	return (
		<div className={`${classes.container}`}>
			{message.user === name ? (
				<div className={`${classes.ownMessage} ${classes.messageBox}`}>
					<Typography>{message.user}</Typography>
					{message.text?.type === "file" ? (
						<File blob={blob} message={message} />
					) : (
						<Typography>{message.text}</Typography>
					)}
				</div>
			) : message.user === "Bot" ? (
				<div className={`${classes.botMessage} ${classes.messageBox}`}>
					<Typography>{message.user}</Typography>
					<Typography>{message.text}</Typography>
				</div>
			) : (
				<div className={`${classes.diffUserMessage} ${classes.messageBox}`}>
					<Typography>{message.user}</Typography>
					{message.text.type === "file" ? (
						<File blob={blob} message={message} />
					) : (
						<Typography>{message.text}</Typography>
					)}
				</div>
			)}
		</div>
	);
}

export default Message;
