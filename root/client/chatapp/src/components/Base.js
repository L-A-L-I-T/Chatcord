import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import OnlineUsers from "./OnlineUsers";
import Chat from "./Chat";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(8),
	},
}));

export default function Base({ children }) {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const closeDrawer = () => {
		setMobileOpen(false);
	};
	return (
		<div className={classes.root}>
			<Navbar handleDrawerToggle={handleDrawerToggle} />
			<OnlineUsers
				handleDrawerToggle={handleDrawerToggle}
				closeDrawer={closeDrawer}
				isOpen={mobileOpen}
			/>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<div>{children}</div>
			</main>
		</div>
	);
}
