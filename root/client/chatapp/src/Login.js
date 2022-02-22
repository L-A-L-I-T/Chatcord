import React, { useState } from "react";
import {
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
	Paper,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./components/Footer";

const useStyles = makeStyles((theme) => ({
	welcomeTxt: {
		textAlign: "center",
		marginTop: "50px",
	},
	paper: {
		marginTop: "100px",
		marginBottom: "200px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "600",
	},
	buttonContainer: {
		padding: "20px",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
}));

export default function Login() {
	const classes = useStyles();
	let navigate = useNavigate();
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	const createRoom = (event) => {
		event.preventDefault();
		var room_id = "";
		var characters =
			"abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (var i = 0; i < 6; i++) {
			room_id += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return room_id;
	};

	const handleCreateRoom = (event) => {
		if (!name) {
			event.preventDefault();
			alert("Please Enter Your Name");
		} else {
			const room = createRoom(event);
			let path = `room/?name=${name}&room=${room}`;
			navigate(path);
		}
	};

	const handleJoinRoom = (event) => {
		if (!name) {
			event.preventDefault();
			alert("Please Enter Your Name");
		} else if (!room) {
			event.preventDefault();
			alert("Please Enter Room ID");
		} else if (room.length !== 6) {
			event.preventDefault();
			setRoom("");
			alert("PLease Enter Valid Room ID");
		} else {
			let path = `room/?name=${name}&room=${room}`;
			navigate(path);
		}
	};

	return (
		<div style={{ position: "relative" }}>
			<Typography
				className={`${classes.welcomeTxt}`}
				variant="h2"
				component="h2"
			>
				Welcome to Chatcord
			</Typography>
			<Container component="main" maxWidth="sm">
				<CssBaseline />

				<div className={classes.paper}>
					<form className={classes.form}>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							autoFocus
							id="name"
							value={name}
							label="Enter Your Name"
							name="name"
							onChange={(event) => {
								setName(event.target.value);
							}}
							style={{ marginBottom: "30px" }}
						/>
						<Grid container spacing={3}>
							<Grid item md={6} sm={12} xs={12}>
								<Paper className={`${classes.buttonContainer}`}>
									<Typography>Create room and invite your friends</Typography>
									<Button
										variant="contained"
										color="primary"
										className={classes.submit}
										onClick={handleCreateRoom}
									>
										Create Room
									</Button>
								</Paper>
							</Grid>
							<Grid item md={6} sm={12} xs={12}>
								<Paper className={`${classes.buttonContainer}`}>
									<Typography>Join Existing Room</Typography>
									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										id="room_id"
										value={room}
										label="Enter Room ID"
										name="Room ID"
										onChange={(event) => {
											setRoom(event.target.value);
										}}
									/>
									<Button
										variant="contained"
										color="primary"
										component={Link}
										to={`/room/?name=${name}&room=${room}`}
										className={classes.submit}
										onClick={handleJoinRoom}
									>
										Join Room
									</Button>
								</Paper>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
			<Footer />
		</div>
	);
}
