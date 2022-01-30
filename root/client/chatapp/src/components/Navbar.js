import React from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles((theme) => ({
	appBar: {
		background: `linear-gradient(to right,${theme.palette.primary.main} , ${theme.palette.primary.light})`,
		zIndex: theme.zIndex.modal + 1,
		boxShadow: "none",
	},
	roomName: {
		marginLeft: "auto",
	},
	appLogo: {
		color: theme.palette.common.white,
	},
	logoButton: {
		"&:hover": {
			background: "none",
		},
	},
	menuButton: {
		marginRight: "1px",
		marginLeft: "-10px", //theme.spacing(2)
		padding: "0",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
}));

export default function Navbar(props) {
	const classes = useStyles();
	return (
		<AppBar className={classes.appBar}>
			<Toolbar>
				<IconButton
					color="black"
					aria-label="open drawer"
					edge="start"
					onClick={props.handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Button
					disableRipple
					className={classes.logoButton}
					component={Link}
					to={`/`}
				>
					<Typography variant="h5" className={classes.appLogo}>
						ChatCord
					</Typography>
				</Button>
				<div className={classes.roomName}>Room Name</div>
			</Toolbar>
		</AppBar>
	);
}
