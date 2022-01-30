import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
	conatiner: {
		position: "fixed",
		width: "100%",
		bottom: "0",
	},
});

function Footer() {
	const classes = styles();
	return <div>footer</div>;
}

export default Footer;
