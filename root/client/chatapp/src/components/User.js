import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
	container: {
		display: "flex",
	},
	iconGreen: {
		color: "green",
		fontSize: "0.7rem",
		marginRight: "10px",
	},
});

function User(props) {
	const classes = styles();
	return (
		<div>
			<div className={`${classes.container}`}>
				<i class={`bi bi-circle-fill ${classes.iconGreen} $`}></i>
				<p>{props.name}</p>
			</div>
		</div>
	);
}

export default User;
