import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { TextField, Button, Icon } from "@material-ui/core";

const styles = makeStyles({
	root: {
		display: "flex",
	},
	inputText: {
		marginRight: "20px",
	},
});

function TextInput(props) {
	const classes = styles();
	return (
		<div className={`${classes.root}`}>
			<TextField
				id="textInput"
				label="Enter Your Message"
				variant="outlined"
				size="small"
				fullWidth
				value={props.message}
				className={`${classes.inputText}`}
				onChange={props.handleMessageChange}
				onKeyPress={(event) =>
					event.key === "Enter" ? props.sendMessage : null
				}
			/>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				endIcon={<Icon>send</Icon>}
				onClick={props.sendMessage}
			>
				Send
			</Button>
		</div>
	);
}

export default TextInput;
