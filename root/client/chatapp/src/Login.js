import React, { useState } from "react";
import {
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
	Paper,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
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
	const [name, setName] = useState();
	const [roomId, setRoomId] = useState("abc123");

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
		if (name === "") return alert("Please Enter your name");
		const room = createRoom(event);
		let path = `room/?name=${name}&room=${room}`;
		navigate(path);
	};

	return (
		<div>
			<Typography
				component="h1"
				variant="h2"
				style={{ textAlign: "center", marginTop: "50px" }}
			>
				Welcome to Chatcord
			</Typography>
			<Container component="main" maxWidth="sm">
				<CssBaseline />

				<div className={classes.paper}>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="name"
							label="Enter Your Name"
							name="email"
							autoFocus
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
										label="Enter Room ID"
										name="Room ID"
										autoFocus
										onChange={(event) => {
											setRoomId(event.target.value);
										}}
									/>
									<Button
										variant="contained"
										color="primary"
										component={Link}
										to={`/room/?name=${name}&room=${roomId}`}
										className={classes.submit}
										onClick={() => {
											if (name === "") {
												alert("Please enter your name");
											}
										}}
									>
										Join Room
									</Button>
								</Paper>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}
