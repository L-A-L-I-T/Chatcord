import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Footer from "./components/Footer";

const styles = makeStyles({
	container: {},
	heading: {
		marginBottom: "150px",
		width: "100%",
		textAlign: "center",
		paddingTop: "50px",
	},
	loginBox: {
		borderRadius: "10px",
		width: "600px",
		padding: "40px",
		margin: "auto",
	},
	createButton: {
		margin: "10px 10px 10px 0px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	joinButton: {
		margin: "10px 0px 10px 10px",
		padding: "10px",
		textAlign: "center",
	},
});

function Login() {
	const classes = styles();
	const [name, setName] = useState("");
	const [room_id, setRoomId] = useState("abc123");
	return (
		<div className={`${classes.container}`}>
			<div className={`${classes.heading}`}>
				<h1>Welcome to ChatCord</h1>
			</div>
			<div className={`${classes.loginBox} border`}>
				<div className={`row mb-3`}>
					<label class="col-4 col-form-label">Enter Your Name</label>
					<div class="col-8">
						<input
							type="text"
							class="form-control"
							value={name}
							onChange={(event) => {
								setName(event.target.value);
								console.log(name);
							}}
						/>
					</div>
				</div>
				<div className="row">
					<Link to={`./room/${room_id}`} class="col">
						<button
							type="button"
							className={`${classes.createButton} col border btn btn-primary`}
						>
							Create Room
						</button>
					</Link>

					<Link
						to={`./room/${room_id}`}
						class="col"
						onClick={(event) => (!name ? event.preventDefault : null)}
					>
						<button className={`${classes.joinButton} border btn btn-primary`}>
							Join Room
							{/* <div class="d-flex ">
							<p>Enter Room ID</p>
							<input type="text" class="form-control" />
						</div> */}
						</button>
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Login;
