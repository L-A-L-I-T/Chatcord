import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import TextInput from "./TextInput";
import Messages from "./Messages";

const useStyles = makeStyles({});

function Chat(props) {
	const classes = useStyles();

	return (
		<div>
			<Messages messages={props.messages} name={props.name} />
			<TextInput
				message={props.message}
				handleMessageChange={props.handleMessageChange}
				sendMessage={props.sendMessage}
			/>
		</div>
	);
}

export default Chat;
