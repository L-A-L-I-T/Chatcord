import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import File from "./File";

const styles = makeStyles((theme) => ({
	container: {
		width: "auto",
	},
	ownMsg: {
		width: "auto",
		display: "flex",
		overflow: "hidden",
		justifyContent: "end",
	},
	diffMsg: {
		width: "auto",
		height: "auto",
		display: "flex",
		overflow: "hidden",
		justifyContent: "start",
	},
	botMsg: {
		width: "auto",
		height: "auto",
		display: "flex",
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
	innerContainer: {
		maxWidth: "75%",
		minWidth: "150px",
		width: "auto",
		borderRadius: "5px",
		position: "relative",
		padding: "10px 15px",
		background: theme.palette.common.chatMessageBackground,
	},
	nameContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: " center",
		marginBottom: "10px",
	},
	name: {
		fontWeight: "600",
		fontSize: "14px",
		color: theme.palette.common.diffMsgName,
		marginRight: "10px",
	},
	message: {
		fontSize: "14px",
		fontWeight: "400",
		color: theme.palette.common.messageText,
		wordBreak: "break-all",
	},
	timestamp: {
		fontSize: "11px",
		fontWeight: "500",
		textTransform: "uppercase",
		color: theme.palette.common.timestamp,
	},
	botMessage: {
		background: `${theme.palette.common.gray}`,
		borderRadius: "5px",
		width: "300px",
		margin: "10px auto",
	},
	arrow: {
		width: "20px",
		height: "25px",
		overflow: "hidden",
		position: "relative",
		float: "left",
		top: "10px",
		left: "-20px",
	},
	arrowAlt: {
		width: "20px",
		height: "25px",
		overflow: "hidden",
		position: "relative",
		float: "right",
		top: "10px",
		left: "20px",
		transform: "rotate(180deg)",
	},
	outer: {
		width: 0,
		height: 0,
		borderRight: `20px solid ${theme.palette.common.chatMessageBackground}`,
		borderTop: "10px solid transparent",
		borderBottom: "10px solid transparent",
		position: "absolute",
		top: "3px",
		left: "-15px",
	},
	outerAlt: {
		width: 0,
		height: 0,
		borderRight: `20px solid ${theme.palette.primary.light}`,
		borderTop: "10px solid transparent",
		borderBottom: "10px solid transparent",
		position: "absolute",
		top: "3px",
		right: "-15px",
		transform: "rotate(180deg)",
	},
	inner: {
		width: 0,
		height: 0,
		borderRight: "20px solid #fffffff",
		borderTop: "10px solid transparent",
		borderBottom: "10px solid transparent",
		position: "absolute",
		top: 0,
		left: "2px",
	},
}));

let blob;

const OwnMessage = ({ message, blob }) => {
	const theme = useTheme();
	const classes = styles();
	return (
		<div className={`${classes.ownMsg}`}>
			<div
				className={`${classes.innerContainer}`}
				style={{ margin: "5px 15px", background: theme.palette.primary.light }}
			>
				<div className={`${classes.outerAlt}`}></div>
				<div className={`${classes.inner}`}></div>
				<div className={`${classes.nameContainer}`}>
					<div className={`${classes.name}`} style={{ color: "#2ecc51" }}>
						{message.user}
					</div>
					<div className={`${classes.timestamp}`} style={{ color: "black" }}>
						{message.time}
					</div>
				</div>
				{message.data.type === "file" ? (
					<File blob={blob} message={message} />
				) : (
					<div className={`${classes.message}`} style={{ color: "black" }}>
						{message.data.msg}
					</div>
				)}
			</div>
		</div>
	);
};

const DifferentUserMessage = ({ message }) => {
	const classes = styles();
	return (
		<div className={`${classes.diffMsg}`}>
			<div
				className={`${classes.innerContainer}`}
				style={{ margin: "5px 15px" }}
			>
				<div className={`${classes.outer}`}></div>
				<div className={`${classes.inner}`}></div>
				<div className={`${classes.nameContainer}`}>
					<div className={`${classes.name}`}>{message.user}</div>
					<div className={`${classes.timestamp}`}>{message.time}</div>
				</div>
				{message.data.type === "file" ? (
					<File blob={blob} message={message} />
				) : (
					<div className={`${classes.message}`}>{message.data.msg}</div>
				)}
			</div>
		</div>
	);
};

const BotMessage = ({ message }) => {
	const classes = styles();
	return (
		<div className={`${classes.botMsg}`}>
			<div
				className={`${classes.innerContainer}`}
				style={{ margin: "5px 15px" }}
			>
				<div className={`${classes.nameContainer}`}>
					<div className={`${classes.name}`} style={{ color: "#121212" }}>
						{message.user}
					</div>
					<div className={`${classes.timestamp}`}>{message.time}</div>
				</div>
				<div className={`${classes.message}`} style={{ fontWeight: "400" }}>
					{message.data.msg}
				</div>
			</div>
		</div>
	);
};

function Message({ message, name }) {
	if (message.data.type === "file") {
		blob = new Blob([message.data.body], { type: message.data.mimeType });
	}
	return message.user === name ? (
		<OwnMessage message={message} blob={blob} />
	) : message.user === "Bot" ? (
		<BotMessage message={message} />
	) : (
		<DifferentUserMessage message={message} blob={blob} />
	);
}

export default Message;
