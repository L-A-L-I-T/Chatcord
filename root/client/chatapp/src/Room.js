import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbar";
import OnlineUsers from "./components/OnlineUsers";
import Chat from "./components/Chat";
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

let socket;
const SERVER = "localhost:8000";

export default function Room() {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const closeDrawer = () => {
		setMobileOpen(false);
	};
	const location = useLocation();

	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	console.log(message, messages, users);

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		setName(name);
		setRoom(room);

		socket = io(SERVER, {
			transports: ["websocket", "polling", "flashsocket"],
		});

		socket.emit("join", { name, room }, (error) => {
			if (error) {
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
		event.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	};

	const leaveRoom = () => {
		socket.emit("disconnect");
		socket.off();
	};

	return (
		<div className={classes.root}>
			<Navbar handleDrawerToggle={handleDrawerToggle} leaveRoom={leaveRoom} />
			<OnlineUsers
				handleDrawerToggle={handleDrawerToggle}
				closeDrawer={closeDrawer}
				isOpen={mobileOpen}
				users={users}
				room={room}
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
					/>
				</div>
			</main>
		</div>
	);
}
