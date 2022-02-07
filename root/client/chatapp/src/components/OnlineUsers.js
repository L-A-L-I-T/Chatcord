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
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	avatarDiv: {
		display: "flex",
		justifyContent: "center",
		"& > *": {
			margin: theme.spacing(3),
		},
	},
	avatar: {
		width: theme.spacing(8),
		height: theme.spacing(8),
		backgroundColor: theme.palette.primary.main,
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
		color: theme.palette.common.green,
	},
}));

export default function OnlineUsers(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();

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
							<Typography style={{ textAlign: "center", marginTop: "20px" }}>
								Room ID : {props.room}
							</Typography>
							<Divider />
							<Typography style={{ textAlign: "center" }}>
								Online Users
							</Typography>
							<div>
								<List>
									{props.users.map((user, index) => {
										return (
											<ListItem>
												<ListItemIcon>
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
					>
						<div>
							<div className={classes.toolbar} />
							<Typography style={{ textAlign: "center", margin: "20px 0px" }}>
								Room ID : {props.room}
							</Typography>
							<Divider />
							<Typography style={{ textAlign: "center", marginTop: "20px" }}>
								Online Users
							</Typography>
							<div>
								<List>
									{props.users.map((user, index) => {
										return (
											<ListItem>
												<ListItemIcon>
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
