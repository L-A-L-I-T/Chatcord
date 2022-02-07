import React from "react";

import Message from "./Message";

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
