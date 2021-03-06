import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from "./components/Navbar";
import OnlineUsers from "./components/OnlineUsers";
import Chat from "./components/Chat";

const SERVER = process.env.REACT_APP_SERVER;

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
		background: theme.palette.common.chatBackground,
	},
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let socket;
export default function Room() {
	let navigate = useNavigate();
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const closeDrawer = () => {
		setMobileOpen(false);
	};
	const location = useLocation();
	const [snackOpen, setSnackOpen] = useState(false);
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [files, setFiles] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleFileChange = (event) => {
		setFiles((files) => [...files, event.target.files[0]]);
	};

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		setName(name);
		setRoom(room);

		socket = io(SERVER, {
			transports: ["websocket", "polling", "flashsocket"],
		});

		socket.emit("join", { name, room }, (error) => {
			if (error) {
				let path = `/`;
				navigate(path);
				alert(error);
			}
		});

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [SERVER, location.search]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((messages) => [...messages, message]);
		});
		socket.on("roomUsers", ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		event?.preventDefault();
		if (message) {
			socket.emit("sendMessage", { type: "msg", msg: message }, () =>
				setMessage("")
			);
		}
		if (files.length > 0) {
			files.map((file, index) => {
				return socket.emit(
					"sendMessage",
					{
						type: "file",
						body: file,
						mimeType: file.type,
						fileName: file.name,
					},
					() => setFiles([])
				);
			});
		}
	};

	const leaveRoom = () => {
		socket.emit("disconnect");
		socket.off();
	};

	const handleSnackOpen = () => {
		setSnackOpen(true);
	};

	const handleSnackClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackOpen(false);
	};

	return (
		<div className={classes.root}>
			<Snackbar
				open={snackOpen}
				autoHideDuration={2000}
				onClose={handleSnackClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert onClose={handleSnackClose} severity="success">
					Room ID Copied!
				</Alert>
			</Snackbar>
			<Navbar handleDrawerToggle={handleDrawerToggle} leaveRoom={leaveRoom} />
			<OnlineUsers
				handleDrawerToggle={handleDrawerToggle}
				closeDrawer={closeDrawer}
				isOpen={mobileOpen}
				users={users}
				room={room}
				handleSnackOpen={handleSnackOpen}
			/>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<div>
					<Chat
						message={message}
						messages={messages}
						name={name}
						handleMessageChange={handleMessageChange}
						sendMessage={sendMessage}
						setMessage={setMessage}
						files={files}
						setFiles={setFiles}
						handleFileChange={handleFileChange}
					/>
				</div>
			</main>
		</div>
	);
}
