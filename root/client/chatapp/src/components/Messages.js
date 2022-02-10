import React from "react";

import Message from "./Message";
import { makeStyles } from "@material-ui/core/styles";

function Messages(props) {
	return (
		<div>
			{props.messages.map((message, index) => {
				return <Message message={message} name={props.name} />;
			})}
		</div>
	);
}

export default Messages;
