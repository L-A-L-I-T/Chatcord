import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import TextInput from "./TextInput";

const server = "localhost:8000";

const useStyles = makeStyles({
	
});

function Chat() {
	const classes = useStyles();
	const { room_id } = useParams();
	useEffect(() => {}, []);

	return (
		<div>
			<div>Chat</div>
			<TextInput />
		</div>
	);
}

export default Chat;
