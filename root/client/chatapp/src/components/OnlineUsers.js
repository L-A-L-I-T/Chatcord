import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//importing components from material ui--------------------------->
import {
	SwipeableDrawer,
	Hidden,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	CssBaseline,
	Typography,
	Divider,
	IconButton,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FilterNoneIcon from "@material-ui/icons/FilterNone";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	name: {
		display: "flex",
		justifyContent: "center",
		marginTop: "-10px",
		marginBottom: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		background: theme.palette.common.sidebar,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	onlineIcon: {
		fontSize: "15px",
		color: theme.palette.common.online,
	},
	roomIdContainer: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		margin: "10px 0px",
	},
	onlineUsers: {
		overflowY: "scroll",
		height: "75vh",
	},
}));

export default function OnlineUsers(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();

	const handleCopy = () => {
		props.handleSnackOpen();
		navigator.clipboard.writeText(props.room);
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<div className={classes.root}>
			<CssBaseline />
			<nav className={classes.drawer}>
				<Hidden smUp implementation="css">
					<SwipeableDrawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={props.isOpen}
						onOpen={props.handleDrawerToggle}
						onClose={props.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						<div>
							<div className={classes.toolbar} />
							<div className={`${classes.roomIdContainer}`}>
								<Typography>Room ID : {props.room}</Typography>
								<IconButton onClick={handleCopy}>
									<FilterNoneIcon />
								</IconButton>
							</div>
							<Divider />
							<Typography style={{ textAlign: "center", marginTop: "20px" }}>
								Online Users
							</Typography>
							<div className={`${classes.onlineUsers}`}>
								<List>
									{props.users.map((user, index) => {
										return (
											<ListItem key={index}>
												<ListItemIcon style={{ marginRight: "-20px" }}>
													<FiberManualRecordIcon
														className={`${classes.onlineIcon}`}
													/>
												</ListItemIcon>
												<ListItemText primary={`${user.name}`} />
											</ListItem>
										);
									})}
								</List>
							</div>
						</div>
					</SwipeableDrawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<SwipeableDrawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
						onOpen={props.handleDrawerToggle}
						onClose={props.handleDrawerToggle}
					>
						<div>
							<div className={classes.toolbar} />
							<div className={`${classes.roomIdContainer}`}>
								<Typography>Room ID : {props.room}</Typography>
								<IconButton onClick={handleCopy}>
									<FilterNoneIcon />
								</IconButton>
							</div>

							<Divider />
							<Typography style={{ textAlign: "center", marginTop: "20px" }}>
								Online Users
							</Typography>
							<div className={`${classes.onlineUsers}`}>
								<List>
									{props.users.map((user, index) => {
										return (
											<ListItem key={index}>
												<ListItemIcon style={{ marginRight: "-20px" }}>
													<FiberManualRecordIcon
														className={`${classes.onlineIcon}`}
													/>
												</ListItemIcon>
												<ListItemText primary={`${user.name}`} />
											</ListItem>
										);
									})}
								</List>
							</div>
						</div>
					</SwipeableDrawer>
				</Hidden>
			</nav>
		</div>
	);
}
