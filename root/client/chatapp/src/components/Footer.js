import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const styles = makeStyles({
	container: {
		position: "fixed",
		width: "100%",
		bottom: "0",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "auto",
		background: "#181818",
	},
});

function Footer() {
	const theme = useTheme();
	const classes = styles();
	return (
		<div className={`${classes.container}`}>
			<p style={{ color: "white", fontSize: "1.1rem" }}>
				Made by{" "}
				<span style={{ color: theme.palette.primary.main }}>Lalit Rajput</span>
			</p>
			<div>
				<IconButton href="https://github.com/L-A-L-I-T" target="_blank">
					<GitHubIcon style={{ fontSize: "2rem", color: "white" }} />
				</IconButton>
				<IconButton
					href="https://www.linkedin.com/in/lalit-rajput-9a1a37215/"
					target="_blank"
				>
					<LinkedInIcon style={{ fontSize: "2.5rem", color: "white" }} />
				</IconButton>
			</div>
		</div>
	);
}

export default Footer;
