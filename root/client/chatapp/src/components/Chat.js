import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { makeStyles } from "@material-ui/core/styles";

import TextInput from "./TextInput";
import Messages from "./Messages";

const useStyles = makeStyles({
	mainDiv: {
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	messagesContainer: {
		height: "75vh",
		marginBottom: "20px",
		overflow: "auto",
		flex: "auto",
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	textInputContainer: {},
});

function Chat(props) {
	const classes = useStyles();

	return (
		<div className={`${classes.mainDiv}`}>
			<ScrollToBottom className={`${classes.messagesContainer}`}>
				<Messages messages={props.messages} name={props.name} />
			</ScrollToBottom>
			<div className={`${classes.textInputContainer}`}>
				<TextInput
					message={props.message}
					handleMessageChange={props.handleMessageChange}
					sendMessage={props.sendMessage}
					setMessage={props.setMessage}
					files={props.files}
					setFiles={props.setFiles}
					handleFileChange={props.handleFileChange}
				/>
			</div>
		</div>
	);
}

export default Chat;
