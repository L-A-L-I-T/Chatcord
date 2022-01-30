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

function TextInput() {
	const classes = styles();
	return (
		<div className={`${classes.root}`}>
			<TextField
				id="textInput"
				label="Enter Your Message"
				variant="outlined"
				size="small"
				fullWidth
				className={`${classes.inputText}`}
			/>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				endIcon={<Icon>send</Icon>}
			>
				Send
			</Button>
		</div>
	);
}

export default TextInput;
