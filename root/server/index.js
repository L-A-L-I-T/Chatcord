const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 8000;

const app = express();

const router = require("./router");

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
	console.log("New Connection");

	socket.on("joinRoom", ({ name, room_id }) => {
		console.log(name, room_id);
	});

	socket.on("createRoom", (name) => {
		console.log(name);
	});

	socket.on("disconnect", () => {
		console.log("Disconnected");
	});
});

app.use(router);

server.listen(PORT, () => {
	console.log(`Server has started at Port : ${PORT}`);
});
