import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { TextField, Button, Icon, IconButton, Popper } from "@material-ui/core";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";

const styles = makeStyles({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "#F0F0F0",
		borderRadius: "10px",
	},
	inputText: {
		marginRight: "5px",
		background: "#DCDCDC",
		borderRadius: "10px",
	},
	noBorder: {
		border: "none",
	},
});

function TextInput(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			console.log("key Pressed");
			props.sendMessage();
		}
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;
	const addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		props.setMessage(props.message + emoji);
	};
	const classes = styles();
	return (
		<div className={`${classes.root}`}>
			<Popper id={id} open={open} anchorEl={anchorEl} placement="top-start">
				<Picker onSelect={addEmoji} />
			</Popper>
			<IconButton aria-describedby={id} type="button" onClick={handleClick}>
				<InsertEmoticonIcon style={{ fontSize: "30px" }} />
			</IconButton>
			<IconButton style={{ marginRight: "10px", transform: "rotate(45deg)" }}>
				<AttachFileIcon style={{ fontWeight: "bold" }} />
			</IconButton>
			<TextField
				id="textInput"
				variant="outlined"
				size="small"
				fullWidth
				placeholder="Enter Your Message"
				value={props.message}
				className={`${classes.inputText}`}
				onChange={props.handleMessageChange}
				onKeyPress={handleKeyPress}
				InputProps={{ classes: { notchedOutline: classes.noBorder } }}
			/>
			<IconButton onClick={props.sendMessage}>
				<SendIcon />
			</IconButton>
		</div>
	);
}

export default TextInput;
