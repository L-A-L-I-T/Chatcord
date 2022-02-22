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
import { useThemeUpdate } from "../Theme/CustomThemeContext";

import MenuIcon from "@material-ui/icons/Menu";
import Brightness4Icon from "@material-ui/icons/Brightness4";
const useStyles = makeStyles((theme) => ({
	appBar: {
		background: theme.palette.primary.main,
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
	const toggleTheme = useThemeUpdate();
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
				<IconButton
					style={{ marginLeft: "auto", marginRight: "10px" }}
					onClick={toggleTheme}
				>
					<Brightness4Icon />
				</IconButton>
				<Button onClick={props.leaveRoom} component={Link} to="/">
					Leave Room
				</Button>
			</Toolbar>
		</AppBar>
	);
}
