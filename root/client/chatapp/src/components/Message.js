import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
	container: {
		borderRadius: "10px",
		background: "	#F8F8F8",
	},
});

function Message(props) {
	const classes = styles();
	return (
		<div className={`${classes.container}`}>
			<h4>{props.userName}</h4>
			<p>{props.message}</p>
			<p>{props.time}</p>
		</div>
	);
}

export default Message;
